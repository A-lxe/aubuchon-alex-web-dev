angular.module('Arcus')
    .directive('arcMenu', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcMenu/menu.html',
            controller: ['$scope', '$mdSidenav', ctrl],
        };

        function ctrl($scope, $mdSidenav) {
            $scope.toggleSidenav = function() {
                $mdSidenav('main-sidenav').toggle();
            }
        }
    });