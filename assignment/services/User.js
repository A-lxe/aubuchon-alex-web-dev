module.exports = function(app, models) {
    app.post('/api/user', createUser);
    app.get('/api/user', findUserByCredentials, findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    var User = models.userModel;

    function createUser(req, res) {
        var newUser = req.body;
        User.createUser(newUser).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(400).json({error: "Username " + newUser.username + " is taken."});
            }
        )
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        if(username) {
            res.status(400).json({error : "Invalid Request!"});
            return;
        }
        User.findUserByUsername(username).then(
            function(response) {
                if(response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Incorrect username or password."});
                }
            },
            function(error) {
                res.status(404).json({error: error});
            }
        )
    }

    function findUserByCredentials(req, res, next) {
        if(!req.query.password) {
            next();
            return;
        }
        var username = req.query.username;
        var password = req.query.password;

        User.findUserByCredentials(username, password).then(
            function(response) {
                if(response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Incorrect username or password."});
                }
            },
            function(error) {
                res.status(404).json({error: error});
            }
        )
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        User.findUserById(id).then(
            function(response) {
                if(response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "User with ID: " + id + " not found."});
                }
            },
            function(error) {
                res.status(404).json({error: error});
            }
        )
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;

        User.updateUser(id, user).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404).json({error: "User with ID: " + id + " not found."});
            }
        )
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        User.deleteUser(id).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404).json({error: "User with ID: " + id + " not found."});
            }
        )
    }
};
