(function () {
    function BotViewCtrl(Bot, $scope, $rootScope, $location, $routeParams, $mdToast, $mdDialog) {
        var vm = this;
        vm.bot = {};
        Bot.findById($routeParams["bid"]).then(
            function (response) {
                vm.bot = response.data;
                $rootScope.currentPageTitle = vm.bot.name;
                if (!vm.bot || vm.bot.owner != $rootScope.currentUser._id) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Bot not found.')
                            .hideDelay(3000)
                    );
                    $location.url('/profile');
                }
            }
        );
    }

    angular.module('Arcus')
        .controller('BotViewCtrl', ['Bot', '$scope', '$rootScope', '$location', '$routeParams', '$mdToast', '$mdDialog', BotViewCtrl])
})
();