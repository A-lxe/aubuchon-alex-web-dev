angular.module('Arcus')
    .directive('arcSidenav', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcSidenav/sidenav.html',
            controller: ['$scope', '$mdSidenav', ctrl]
        };

        function ctrl($scope) {
            $scope.entries = [
                {name: 'Home', url: '#/', icon: 'home'}
            ];
        }
    });