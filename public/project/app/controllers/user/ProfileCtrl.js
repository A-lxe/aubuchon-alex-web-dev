(function () {
    function ProfileCtrl(User, Bot, $scope, $rootScope, $location, $mdToast) {
        $rootScope.currentPageTitle = "Profile";
        var vm = this;
        vm.user = angular.copy($rootScope.currentUser);
        vm.bots = []
        vm.botsLeft = [];
        vm.botsRight = [];

        if (!vm.user) {
            $location.url('/login');
        }

        Bot.findByUserId(vm.user._id).then(
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

        vm.update = function () {
            if (vm.changes) {
                User.updateSingle(vm.user).then(
                    function (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Saved!')
                                .hideDelay(3000)
                        );
                        vm.changes = false;
                    },
                    function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not update. Error: ' + error.data.message)
                                .hideDelay(3000)
                        );
                    }
                );
                User.retrieveSingle($rootScope.currentUser._id).then(
                    function (response) {
                        $rootScope.currentUser = response.data;
                    },
                    function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not retrieve. Error: ' + error.data.message)
                                .hideDelay(3000)
                        );
                    }
                )
            }
        }

        vm.newBot = function () {
            Bot.create({name: "My New Bot"}).then(
                function (response) {
                    $location.url("/bot/edit/" + response.data._id);
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Could not create. Error: ' + error.data.message)
                            .hideDelay(3000)
                    );
                }
            )
        }
    }

    angular.module('Arcus')
        .controller('ProfileCtrl', ['User', 'Bot', '$scope', '$rootScope', '$location', '$mdToast', ProfileCtrl])
})
();