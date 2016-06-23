module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var DiscordStrategy = require('passport-discord').Strategy;
    var User = models.userModel;
    var bcrypt = require('bcrypt-nodejs');

    var scopes = ['identify', 'email'];
    var discordConfig = {
        clientID: process.env.DISCORD_CLIENT_ID || "194693171354140672",
        clientSecret: process.env.DISCORD_CLIENT_SECRET || "7iBOp_4jCHnfJGq5iOaNzfMjFGoaug5N",
        callbackURL: process.env.DISCORD_CALLBACK_URL || "http://127.0.0.1:3000/arcus/auth/discord/callback",
        scope: scopes
    };

    app.post('/arcus/api/user', createUser);
    app.get('/arcus/api/user/:userId', findUserById);
    app.patch('/arcus/api/user', updateUser);
    app.delete('/arcus/api/user/:userId', deleteUser);
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
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
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
                            User.create(
                                {
                                    discord: {
                                        id: profile.id,
                                        username: profile.username,
                                        discriminator: profile.discriminator,
                                        email: profile.email,
                                        avatar: profile.avatar
                                    }
                                }).then(
                                function(user) {
                                    resolve(user);
                                },
                                function(error) {
                                    reject(error);
                                }
                            );
                        }
                    },
                    function(error) {
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
        res.send(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        console.log(JSON.stringify(user));
        User
            .createUser(user)
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
                    res.status(402);
                    res.json({error: "Couldn't create user: " + error});
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }


    function createUser(req, res) {
        var newUser = req.body;
        User.createUser(newUser).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(400).json({error: "Username " + newUser.username + " is taken."});
            }
        )
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        User.findUserById(id).then(
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
        var id = req.params.userId;
        var user = req.body;

        User.updateUser(id, user).then(
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
