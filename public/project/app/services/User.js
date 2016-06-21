(function () {
    function User($http, $rootScope) {

        return {
            login: login,
            logout: logout,
            register: register,
            checkSession: checkSession,
            create: create,
            retrieveSingle: retrieveSingle,
            updateSingle: updateSingle,
            deleteSingle: deleteSingle
        }

        function login(user) {
            return $http.post("/arcus/api/login", user).then(
                function (response) {
                    if (response.data) {
                        $rootScope.currentUser = response.data;
                    } else {
                        $rootScope.currentUser = null;
                    }
                    return response;
                }
            );
        }

        function logout() {
            return $http.post("/arcus/api/logout").then(
                function (response) {
                    $rootScope.currentUser = null;
                    return response;
                }
            );
        }

        function register(user) {
            return create(user).then(
                function (response) {
                    user._id = response.data._id;
                    login(user);
                    return response;
                }
            );
        }

        function checkSession() {
            return $http.get("/arcus/api/session").then(
                function (response) {
                    if (response.data) {
                        $rootScope.currentUser = response.data;
                    } else {
                        $rootScope.currentUser = null;
                    }
                    return response;
                }
            );
        }

        function create(user) {
            return $http.post("/arcus/api/user", user);
        }

        function retrieveSingle(userId) {
            return $http.get("/arcus/api/user/" + userId);
        }

        function updateSingle(user) {
            return $http.patch("/arcus/api/user", user).then(
                function (response) {
                    $rootScope.currentUser = response.data;
                }
            );
        }

        function deleteSingle(user) {
            return $http.delete("/arcus/api/user/" + userId);
        }
    }

    angular.module('Arcus')
        .factory('User', ['$http', '$rootScope', User])
})();