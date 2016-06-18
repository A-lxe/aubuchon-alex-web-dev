module.exports = function (app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var User = models.userModel;

    app.post('/api/user', createUser);
    app.get('/api/user', findUserByCredentials, findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get ('/api/loggedin', loggedin);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('wam', new LocalStrategy(localStrategy));

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
        res.send(req.isAuthenticated() ? req.user : '0');
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
