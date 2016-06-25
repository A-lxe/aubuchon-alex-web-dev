angular.module('Arcus')
    .directive('arcBotCard', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcBotCard/botCard.html',
            controller: ['$scope', 'Bot', ctrl],
            scope: {
                _id: '=_id',
                bot: '=bot'
            }
        };

        function ctrl($scope, Bot) {
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
        }
    });