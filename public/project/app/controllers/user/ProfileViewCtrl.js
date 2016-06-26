(function () {
    function ProfileViewCtrl(User, Bot, $scope, $rootScope, $window, $routeParams, $mdToast) {
        var vm = this;
        vm.bots = []
        vm.botsLeft = [];
        vm.botsRight = [];
        
        User.retrieveSingle($routeParams["uid"]).then(
            function(response) {
                vm.user = response.data;
                $rootScope.currentPageTitle = vm.user.discord.username || vm.user.username;
            },
            function(error) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Couldn't find that user.")
                        .hideDelay(3000)
                );
                $window.history.back()
            }
        )

        Bot.findByUserId($routeParams["uid"]).then(
            function (response) {
                for (var i in response.data) {
                    vm.bots.push(response.data[i]);
                    if (i % 2 == 0) {
                        vm.botsLeft.push(response.data[i]);
                    } else {
                        vm.botsRight.push(response.data[i]);
                    }
                }
            }
        )
    }

    angular.module('Arcus')
        .controller('ProfileViewCtrl', ['User', 'Bot', '$scope', '$rootScope', '$window', '$routeParams', '$mdToast', ProfileViewCtrl])
})
();