(function () {
    function RegisterCtrl(User, $location, $mdToast, $rootScope) {
        var vm = this;
        vm.username = "";
        vm.password = "";
        vm.passwordConfirm = "";
        vm.usernameWarning = false;
        vm.passwordWarning = false;

        vm.validateUsername = function () {
            User.userWithUsername(vm.username).then(
                function (response) {
                    vm.usernameWarning = "That username is taken, sorry!";
                },
                function (error) {
                    vm.usernameWarning = false;
                }
            )
        }

        vm.validatePassword = function () {
            if (vm.password !== vm.passwordConfirm) {
                vm.passwordWarning = "Passwords don't match!";
            } else {
                vm.passwordWarning = false;
            }
        }

        vm.register = function () {
            vm.validateUsername();
            vm.validatePassword();
            if (vm.usernameWarning || vm.passwordWarning) {
                return;
            }
            var temp = {
                _id: "",
                username: vm.username,
                password: vm.password,
                firstName: "",
                lastName: "",
                email: ""
            };
            User
                .register(temp)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    },
                    function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('User creation failed. Error:' + error.data.error)
                                .hideDelay(3000)
                        );
                    }
                );
        }
    }

    angular.module('App')
        .controller('RegisterCtrl', ['User', '$location', "$mdToast", "$rootScope", RegisterCtrl])
})
();