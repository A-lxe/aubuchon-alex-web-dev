(function () {
    function BotListCtrl(User, Bot, $scope, $rootScope, $location, $mdToast) {
        $rootScope.currentPageTitle = "The Best Bots You've Seen";
        var vm = this;
        vm.bots = []
        vm.botsLeft = [];
        vm.botsRight = [];
        vm.searchString = '';

        Bot.findBest(0, 20, '{"name": 1}').then(
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

        vm.search = function() {
            Bot.searchBots(vm.searchString).then(
                function(response) {
                    vm.bots = []
                    vm.botsLeft = [];
                    vm.botsRight = [];
                    for (var i in response.data) {
                        vm.bots.push(response.data[i]);
                        if (i % 2 == 0) {
                            vm.botsLeft.push(response.data[i]);
                        } else {
                            vm.botsRight.push(response.data[i]);
                        }
                    }
                },
                function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Could not search. Error: ' + error.data.message)
                            .hideDelay(3000)
                    );
                }
            )
        }
    }

    angular.module('Arcus')
        .controller('BotListCtrl', ['User', 'Bot', '$scope', '$rootScope', '$location', '$mdToast', BotListCtrl])
})
();