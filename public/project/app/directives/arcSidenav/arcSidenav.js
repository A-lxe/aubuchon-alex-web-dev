angular.module('Arcus')
    .directive('arcSidenav', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcSidenav/sidenav.html',
            controller: ['$scope', '$rootScope', '$mdSidenav', ctrl]
        };

        function ctrl($scope, $rootScope) {
            $scope.entries = [
                {name: 'Home', url: '#/', icon: 'home'},
                {name: 'Discord Bots', url: '#/bots', icon: 'power'}
            ];

            $scope.entries.concat($rootScope.sidenavLinks);

            if($rootScope.loggedIn) {
                $scope.profileEntries = [
                    {name: 'Profile', url: '#/profile', icon: 'person'}
                ]
            }
            else {
                $scope.profileEntries = [
                    {name: 'Login', url: '#/login', icon: ''},
                    {name: 'Register', url: '#/register', icon: ''}
                ]
            }

            $scope.profileEntries.concat($rootScope.sidenavProfileLinks);

        }
    });