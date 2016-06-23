(function () {
    angular.module('Arcus')
        .config(function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'https://www.youtube.com/**'
            ]);
        })
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/home/arcus.html',
                    controller: 'ArcusCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/feedback', {
                    templateUrl: 'partials/home/feedback.html'
                })
                .when('/login', {
                    templateUrl: 'partials/user/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/profile', {
                    templateUrl: 'partials/user/profile.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'ctrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .run(checkLoggedin);

    function checkLoggedin($http, $rootScope) {
        console.log("Checking logged in...");
        return $http.get('/arcus/api/session').then(
            function (response) {
                console.log("Logged in with " + JSON.stringify(response.data));
                $rootScope.currentUser = response.data;
                $rootScope.logout = logout;
            },
            function (error) {
                console.log("Error checking session: " + JSON.stringify(error));
            }
        )
    }

    function logout($http, $rootScope, $location) {
        return function () {
            $http.post("/arcus/api/logout").then(
                function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }
    }
})();