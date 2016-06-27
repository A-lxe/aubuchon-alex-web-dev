module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var DiscordStrategy = require('passport-discord').Strategy;
    var User = models.userModel;
    var CB = models.cbModel;
    var bcrypt = require('bcrypt-nodejs');

    var scopes = ['identify', 'email'];
    var discordConfig = {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_CALLBACK_URL || "http://127.0.0.1:3000/arcus/auth/discord/callback",
        scope: scopes
    };

    app.post('/arcus/api/user', createUser);
    app.get('/arcus/api/user/:userId', findUserById);
    app.patch('/arcus/api/user', checkAuthenticated, updateUser);
    app.delete('/arcus/api/user/:userId', checkAuthenticated, deleteUser);
    app.post('/arcus/api/login', passport.authenticate('local'), login);
    app.post('/arcus/api/logout', logout);
    app.post('/arcus/api/register', register);
    app.get('/arcus/api/session', loggedin);
    app.get('/arcus/auth/discord', passport.authenticate('discord', {scope: scopes}));
    app.get('/arcus/auth/discord/callback',
        passport.authenticate('discord', {
            successRedirect: '/project/index.html#/profile',
            failureRedirect: '/project/index.html#/login'
        }));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('local', new LocalStrategy(localStrategy));
    passport.use('discord', new DiscordStrategy(discordConfig, discordStrategy));

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated() && req.user) {
            next();
        } else {
            res.status(401);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        User
            .findById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        User
            .findByUsername(username)
            .then(
                function (user) {
                    if (user && user.password && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done("Wrong username/password", null);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err, null);
                    }
                }
            );
    }

    function discordStrategy(accessToken, refreshToken, profile, cb) {
        new Promise(function (resolve, reject) {
            User
                .findByDiscordId(profile.id)
                .then(
                    function (user) {
                        if (user) {
                            resolve(user);
                        } else {
                            createUserUsing(
                                {
                                    discord: {
                                        id: profile.id,
                                        username: profile.username,
                                        discriminator: profile.discriminator,
                                        email: profile.email,
                                        avatar: profile.avatar
                                    }
                                }).then(
                                function (user) {
                                    resolve(user);
                                },
                                function (error) {
                                    reject(error);
                                }
                            );
                        }
                    },
                    function (error) {
                        reject(error);
                    }
                )
        }).then(
            function (fulfilled) {
                return cb(null, fulfilled);
            },
            function (error) {
                return cb(error, null);
            }
        )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function register(req, res) {
        console.log("Attempting to create user: " + JSON.stringify(req.body));
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        createUserUsing(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400);
                    console.log(error);
                    res.json({message: "Username taken."});
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }


    function createUser(req, res) {
        createUserUsing(req.body).then(
            function(user) {
                res.json(user);
            },
            function(error) {
                res.status(500).json(error);
            }
        );
    }

    function createUserUsing(user) {
        return new Promise(function (resolve, reject) {
            var newUser = user;
            CB.create({}).then(
                function (cb) {
                    newUser.comments = cb._id;
                    User.create(newUser).then(
                        function (user) {
                            cb.root = user._id;
                            cb.owner = user._id;
                            CB.update(cb._id, cb).then(
                                function (cb) {
                                    resolve(user);
                                },
                                function (error) {
                                    reject(error);
                                }
                            )
                        },
                        function (error) {
                            reject(error);
                        }
                    )
                },
                function (error) {
                    reject(error);
                }
            )
        });
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        User.findById(id).then(
            function (response) {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "User with ID: " + id + " not found."});
                }
            },
            function (error) {
                res.status(404).json({error: error});
            }
        )
    }

    function updateUser(req, res) {

        var user = req.body;
        var id = user._id;

        if (req.user._id != id) {
            res.status(401);
            res.json({message: "Unauthorized."});
            return;
        }

        User.update(id, user).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "User with ID: " + id + " not found."});
            }
        )
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        if (req.user._id != id) {
            res.status(401);
            res.json({message: "Unauthorized."});
            return;
        }

        User.deleteUser(id).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "User with ID: " + id + " not found."});
            }
        )
    }
};
