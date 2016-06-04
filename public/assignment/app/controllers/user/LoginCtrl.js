(function () {
    function LoginCtrl(User, $location, $mdToast) {
        var vm = this;
        vm.username = "";
        vm.password = "";

        vm.login = function () {
            User.findUserByCredentials(vm.username, vm.password).then(
                function (response) {
                    $location.url("/user/" + response.data._id);
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
        .controller('LoginCtrl', ['User', '$location', "$mdToast", LoginCtrl])
})
();