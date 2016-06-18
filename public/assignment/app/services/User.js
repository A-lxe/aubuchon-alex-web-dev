(function() {
    function User($http) {

        function login(user) {
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/register", user);
        }

        function createUser(user) {
            var url = "/api/user";
            var user = {
                username: user.username,
                password: user.password
            };
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function userWithUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        return {
            login: login,
            logout: logout,
            register: register,
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            userWithUsername: userWithUsername
        }
    }

    angular.module('App')
        .factory('User', ['$http', User])
})();