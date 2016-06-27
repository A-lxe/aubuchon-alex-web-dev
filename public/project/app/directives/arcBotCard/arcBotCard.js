angular.module('Arcus')
    .directive('arcBotCard', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcBotCard/botCard.html',
            controller: ['$scope', 'Bot', 'User', '$route', '$routeParams', '$mdDialog', ctrl],
            scope: {
                _id: '=_id',
                bot: '=bot',
                elevated: '=elevated'
            }
        };

        function ctrl($scope, Bot, User, $route, $routeParams, $mdDialog) {
            if(!$scope.bot) {
                Bot.findById($routeParams["bid"] || $scope._id).then(
                    function(response) {
                        $scope.bot = response.data;
                        User.retrieveSingle(response.data.owner).then(
                            function(user) {
                                $scope.owner = user.data;
                            }
                        )
                    },
                    function(error) {
                        $scope.bot = null;
                        $scope.error = error;
                    }
                )
            } else {
                User.retrieveSingle($scope.bot.owner).then(
                    function(user) {
                        $scope.owner = user.data;
                    }
                )
            }

            $scope.deleteBot = function () {
                var confirm = $mdDialog.confirm()
                    .title('Delete ' + $scope.bot.name)
                    .textContent('Are you sure you want to delete ' + $scope.bot.name + '?')
                    .ariaLabel('Delete ' + $scope.bot.name)
                    .ok('It must be done.')
                    .cancel('On second thought...');
                $mdDialog.show(confirm).then(function () {
                    Bot.deleteBot($scope.bot._id).then(
                        function(response) {
                            $route.reload();
                        }
                    )
                });
            }
        }
    });