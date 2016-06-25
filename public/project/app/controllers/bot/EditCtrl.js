(function () {
    function EditCtrl(Bot, $scope, $rootScope, $location, $routeParams, $mdToast, $mdDialog) {
        var vm = this;
        Bot.findById($routeParams["bid"]).then(
            function (response) {
                vm.bot = response.data;
                $rootScope.currentPageTitle = "Edit:" + vm.bot.name;
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

        vm.update = function () {
            Bot.update(vm.bot).then(
                function (response) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Saved!')
                            .hideDelay(3000)
                    );
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Could not update. Error: ' + error.data.message)
                            .hideDelay(3000)
                    );
                }
            );
        }

        vm.delete = function () {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + vm.bot.name)
                .textContent('Are you sure you want to delete ' + vm.bot.name + '?')
                .ariaLabel('Delete ' + vm.bot.name)
                .ok('It must be done.')
                .cancel('On second thought...');
            $mdDialog.show(confirm).then(function () {
                Bot.deleteBot(vm.bot._id);
                $location.url("/profile");
            });
        }
    }

    angular.module('Arcus')
        .controller('EditCtrl', ['Bot', '$scope', '$rootScope', '$location', '$routeParams', '$mdToast', '$mdDialog', EditCtrl])
})
();