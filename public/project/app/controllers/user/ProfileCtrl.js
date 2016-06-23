(function () {
    function ProfileCtrl(User, $scope, $rootScope, $location, $mdToast) {
        var vm = this;
        vm.user = angular.copy($rootScope.currentUser);
        
        if(!vm.user) {
            $location.url('/login');
        }
        
        vm.update = function() {
            if(vm.user != $rootScope.currentUser) {
                User.updateSingle(vm.user).then(
                    function(response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Saved!')
                                .hideDelay(3000)
                        );
                    },
                    function(error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not update. Error: ' + error.data.message)
                                .hideDelay(3000)
                        );
                    }
                );
                User.retrieveSingle($rootScope.currentUser._id).then(
                    function(response) {
                        $rootScope.currentUser = response.data;
                    },
                    function(error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not retrieve. Error: ' + error.data.message)
                                .hideDelay(3000)
                        );
                    }
                )
            }
        }
    }

    angular.module('Arcus')
        .controller('ProfileCtrl', ['User', '$scope', '$rootScope', '$location', '$mdToast', ProfileCtrl])
})
();