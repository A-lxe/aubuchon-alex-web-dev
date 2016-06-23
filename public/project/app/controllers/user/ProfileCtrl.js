(function () {
    function ProfileCtrl(User, $scope, $rootScope, $location, $mdToast) {
        var vm = this;
        vm.user = angular.copy($rootScope.currentUser);
        
        if(!vm.user) {
            $location.url('/login');
        }
        
        vm.update = function() {
            if(vm.user != $rootScope.currentUser) {
                User.update(vm.user).then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not update. Error: ' + error.data.message)
                                .hideDelay(3000)
                        );
                    }
                );
            }
        }
    }

    angular.module('Arcus')
        .controller('ProfileCtrl', ['User', '$scope', '$rootScope', '$location', '$mdToast', ProfileCtrl])
})
();