angular.module('Arcus')
    .directive('arcSidenav', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcSidenav/sidenav.html',
            controller: ['$scope', '$rootScope', '$mdSidenav', ctrl]
        };

        function ctrl($scope, $rootScope, $mdSidenav) {
            $scope.entries = [
                {name: 'Home', url: '#/', icon: 'home'},
                {name: 'Discord Bots', url: '#/bots', icon: 'power'}
            ];

            $scope.entries.concat($rootScope.sidenavLinks);

            if ($rootScope.currentUser) {
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

            $scope.closeNav = function () {
                $mdSidenav('main-sidenav').close();
            }

            $scope.profileEntries.concat($rootScope.sidenavProfileLinks);

        }
    });