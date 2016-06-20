angular.module('Arcus')
    .directive('arcFooting', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcFooting/footing.html'
        };

        function ctrl($scope) {
        }
    });