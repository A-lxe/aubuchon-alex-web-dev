angular.module('Arcus')
    .directive('arcSidenav', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcSidenav/sidenav.html'
        };
    });