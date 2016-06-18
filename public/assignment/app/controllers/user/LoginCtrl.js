(function () {
    function LoginCtrl(User, $location, $mdToast, $rootScope) {
        var vm = this;
        vm.username = "";
        vm.password = "";

        vm.login = login;

        function login() {
            User
                .login({username: vm.username, password: vm.password})
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $rootScope.logout = logout;
                        $location.url("/user/" + user._id);
                    },
                    function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not log in. Error: ' + error.data.error)
                                .hideDelay(3000)
                        );
                    }
                );
        }

        function logout() {
            User
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }
    }

    angular.module('App')
        .controller('LoginCtrl', ['User', '$location', "$mdToast", "$rootScope", LoginCtrl])
})
();