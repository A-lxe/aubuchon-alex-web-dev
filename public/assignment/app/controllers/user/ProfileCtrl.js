(function () {
    function ProfileCtrl(User, $location, $mdToast, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.user = User.findUserById(vm.userId);

        vm.changes = false;

        vm.checkChanged = function() {
            vm.changes = true;
        }

        vm.update = function () {
            User.updateUser(vm.userId, angular.copy(vm.user));
            vm.changes = false;
        }
    }

    angular.module('App')
        .controller('ProfileCtrl', ['User', '$location', "$mdToast", '$routeParams', ProfileCtrl])
})
();