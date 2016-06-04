(function () {
    function RegisterCtrl(User, $location, $mdToast) {
        var vm = this;
        vm.username = "";
        vm.password = "";
        vm.passwordConfirm = "";
        vm.usernameWarning = false;
        vm.passwordWarning = false;

        vm.validateUsername = function () {
            if (User.userWithUsername(vm.username)) {
                vm.usernameWarning = "That username is taken, sorry!";
            } else {
                vm.usernameWarning = false;
            }
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
            User.createUser(temp).then(
                function (response) {
                    console.log(JSON.stringify(response.data));
                    $location.url('/user/' + response.data._id);
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('User creation failed.')
                            .hideDelay(3000)
                    );
                });
        }
    }

    angular.module('App')
        .controller('RegisterCtrl', ['User', '$location', "$mdToast", RegisterCtrl])
})
();