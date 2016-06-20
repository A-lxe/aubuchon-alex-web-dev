angular.module('Arcus')
    .directive('arcMenu', function() {
        return {
            restrict: 'E',
            scope: {
                title: '=title'
            },
            templateUrl: 'app/directives/arcMenu/menu.html',
            controller: ['$scope', '$mdSidenav', ctrl]
        };

        function ctrl($scope, $mdSidenav) {
            $scope.toggleSidenav = function() {
                return $mdSidenav('main-sidenav')
                    .toggle().then(function() {
                    console.log("opened");
                });
            }
        }
    });