(function () {
    function BotViewCtrl(Bot, $scope, $rootScope, $location, $window, $routeParams, $mdToast, $mdDialog) {
        var vm = this;
        vm.bot = {};
        vm.canComment = $rootScope.currentUser;
        Bot.findById($routeParams["bid"]).then(
            function (response) {
                vm.bot = response.data;
                $rootScope.currentPageTitle = vm.bot.name;
                if (!vm.bot) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Bot not found.')
                            .hideDelay(3000)
                    );
                    $window.history.back()
                }
                if ($rootScope.currentUser && vm.bot.owner == $rootScope.currentUser._id) {
                    vm.elevated = true;
                }
            },
            function (error) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Bot not found.')
                        .hideDelay(3000)
                );
                $window.history.back()
            }
        );

        vm.postComment = function () {
            if (vm.canComment) {

            }
        }
    }

    angular.module('Arcus')
        .controller('BotViewCtrl', ['Bot', '$scope', '$rootScope', '$location', '$window', '$routeParams', '$mdToast', '$mdDialog', BotViewCtrl])
})
();