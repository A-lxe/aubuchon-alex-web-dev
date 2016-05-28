(function() {
    function User() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        function createUser(user) {
            users.push(user);
        }

        function findUserById(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    return users[i];
                }
            }
        }

        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
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

        return {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        }
    }

    angular.module('App')
        .factory('User', User)
})();