(function () {
    function ProfileCtrl(User, $scope, $rootScope, $location, $mdToast) {
        var vm = this;
        vm.user = $rootScope.currentUser;
        if(!vm.user) {
            $location.url('/login');
        }
    }

    angular.module('Arcus')
        .controller('ProfileCtrl', ['User', '$scope', '$rootScope', '$location', '$mdToast', ProfileCtrl])
})
();