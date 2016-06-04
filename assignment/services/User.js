module.exports = function(app) {
    app.post('/api/user', createUser);
    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function createUser(req, res) {
        var newUser = req.body
        if(userWithUsername(newUser.username)) {
            res.status(400).json({error: "Username " + newUser.username + " is already in use."});
            return;
        }
        newUser._id = newId();
        newUser.firstName = "";
        newUser.lastName = "";
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(i in users) {
            if(users[i].username === username) {
                res.json(users[i]);
                return;
            }
        }
        res.status(404).json({error: "User " + username + " was not found."});
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(i in users) {
            if(users[i].username === username && users[i].password === password) {
                res.json(users[i]);
                return;
            }
        }
        res.status(404).json({error: "Incorrect username or password."});
    }

    function findUserById(req, res) {
        var id = req.params.userId;
        for(i in users) {
            if(users[i]._id == id) {
                res.json(users[i]);
                return;
            }
        }
        res.status(404).json({error: "User with ID: " + id + " not found."});
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;
        for(i in users) {
            if(users[i]._id == id) {
                old = users[i];
                users[i] = {
                    _id : id,
                    username : user.username || old.username,
                    password : user.password || old.password,
                    firstName : user.firstName || old.firstName,
                    lastName : user.lastName || old.lastName
                }
                res.json(users[i]);
                return;
            }
        }
        res.status(404).json({error: "User with ID: " + id + " not found."});
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for(i in users) {
            if(users[i]._id == id) {
                users[i].splice(i, 1);
                res.end()
                return;
            }
        }
        res.status(404).json({error: "User with ID: " + id + " not found."});
    }

    function newId() {
        var temp = 0;
        for(i in users) {
            temp = Math.max(users[i]._id, temp);
        }
        return temp + 1;
    }

    function userWithUsername(username) {
        for(i in users) {
            if(users[i].username === username) {
                return true;
            }
        }
        return false;
    }
}
