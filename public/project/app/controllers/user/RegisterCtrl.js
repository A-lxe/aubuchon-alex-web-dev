(function () {
    function RegisterCtrl(User, $scope, $rootScope, $location, $mdToast) {
        $rootScope.currentPageTitle = "Register";
        var vm = this;
        if ($rootScope.currentUser) {
            $location.url('/profile');
        }
        vm.user = {
            username: '',
            password: '',
            confirmPassword: ''
        };
        vm.confirmPasswordErr = false;

        vm.register = register;
        vm.verify = verify;

        function register() {
            if (verify()) {
                return;
            }
            User
                .register(vm.user)
                .then(
                    function (response) {
                        User.login(vm.user).then(
                            function(response) {
                                $location.url('/profile');
                            },
                            function(error) {
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent('Could not log in. Error: ' + error.data.message)
                                        .hideDelay(3000)
                                );
                            }
                        );
                    },
                    function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not register. Error: ' + error.data.message)
                                .hideDelay(3000)
                        );
                    }
                );
        }

        function verify() {
            return vm.confirmPasswordErr = (vm.user.password != vm.user.confirmPassword);
        }
    }

    angular.module('Arcus')
        .controller('RegisterCtrl', ['User', '$scope', '$rootScope', '$location', '$mdToast', RegisterCtrl])
})
();