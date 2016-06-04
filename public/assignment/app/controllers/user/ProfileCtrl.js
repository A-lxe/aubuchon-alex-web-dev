(function () {
    function ProfileCtrl(User, $routeParams, $location, $mdToast) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        User.findUserById(vm.userId).then(
            function(response) {
                vm.user = response.data;
            },
            function(error) {
                console.log("User could not be loaded. Error: " + error.data.error);
                $location.url("/login");
            }
        );

        vm.changes = false;

        vm.checkChanged = function() {
            vm.changes = true;
        }

        vm.update = function () {
            User.updateUser(vm.userId, angular.copy(vm.user)).then(
                function(response) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Save successful!')
                            .hideDelay(3000)
                    );
                },
                function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Save failed. Error: ' + error.data.error)
                            .hideDelay(3000)
                    );
                }
            );
            vm.changes = false;
        }
    }

    angular.module('App')
        .controller('ProfileCtrl', ['User', '$routeParams', '$location', '$mdToast', ProfileCtrl])
})
();