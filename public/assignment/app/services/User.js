(function() {
    function User() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        function createUser(user) {
            if(userWithUsername(user.username)) {
                return false;
            }
            var newUser = angular.copy({
                _id: newId(),
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            })
            users.push(newUser);
            return angular.copy(newUser);
        }

        function newId() {
            var temp = 0;
            for(var i in users) {
                temp = Math.max(users[i]._id, temp);
            }
            return temp + 1;
        }

        function findUserById(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    return angular.copy(users[i]);
                }
            }
        }

        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return angular.copy(users[i]);
                }
            }
        }

        function updateUser(userId, user) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                }
            }
        }

        function deleteUser(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    users.splice(i,1);
                }
            }
        }

        function userWithUsername(username) {
            for(var i in users) {
                if(users[i].username === username) {
                    return true;
                }
            }
            return false;
        }

        return {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            userWithUsername: userWithUsername
        }
    }

    angular.module('App')
        .factory('User', User)
})();