(function () {
    function LoginCtrl(User, $location, $mdToast) {
        var vm = this;
        vm.username = "";
        vm.password = "";

        vm.login = function () {
            var temp = User.findUserByCredentials(vm.username, vm.password);
            if (temp == null) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Incorrect username or password.')
                        .hideDelay(3000)
                );
            } else {
                $location.url("/user/" + temp._id);
            }
        }
    }

    angular.module('App')
        .controller('LoginCtrl', ['User', '$location', "$mdToast", LoginCtrl])
})
();