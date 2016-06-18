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
        
    }

    angular.module('App')
        .controller('LoginCtrl', ['User', '$location', "$mdToast", "$rootScope", LoginCtrl])
})
();