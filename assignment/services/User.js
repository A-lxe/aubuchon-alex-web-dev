module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var User = models.userModel;

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID || "1713967685511447",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "9ff7e7cc814ccff59de24c6887747093",
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://127.0.0.1:3000/auth/facebook/callback"
    };

    app.post('/api/user', createUser);
    app.get('/api/user', findUserByCredentials, findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedin);
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        User
            .findUserById(user._id)
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
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user.username === username && user.password === password) {
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

    function facebookStrategy(token, refreshToken, profile, done) {
        User
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        return User.createUser(
                            {
                                username: profile.displayName.replace(/ /g, ''),
                                facebook: {id: profile.id, displayName: profile.displayName}
                            });
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            ).then(
            function(user) {
                return done(null, user);
            }
        );
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

    function findUserByUsername(req, res) {
        var username = req.query.username;
        if (username) {
            res.status(400).json({error: "Invalid Request!"});
            return;
        }
        User.findUserByUsername(username).then(
            function (response) {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Incorrect username or password."});
                }
            },
            function (error) {
                res.status(404).json({error: error});
            }
        )
    }

    function findUserByCredentials(req, res, next) {
        if (!req.query.password) {
            next();
            return;
        }
        var username = req.query.username;
        var password = req.query.password;

        User.findUserByCredentials(username, password).then(
            function (response) {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Incorrect username or password."});
                }
            },
            function (error) {
                res.status(404).json({error: error});
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
