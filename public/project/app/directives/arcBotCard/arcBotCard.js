angular.module('Arcus')
    .directive('arcBotCard', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcBotCard/botCard.html',
            controller: ['$scope', 'Bot', '$route', '$mdDialog', ctrl],
            scope: {
                _id: '=_id',
                bot: '=bot',
                elevated: '=elevated'
            }
        };

        function ctrl($scope, Bot, $route, $mdDialog) {
            if(!$scope.bot) {
                Bot.findById($scope._id).then(
                    function(bot) {
                        $scope.bot = bot;
                    },
                    function(error) {
                        $scope.bot = null;
                        $scope.error = error;
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