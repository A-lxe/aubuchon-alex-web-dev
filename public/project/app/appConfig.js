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
                .when('/logout', {
                    resolve: {logout: logoutNow}
                })
                .when('/profile', {
                    templateUrl: 'partials/user/profile.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/profile/:uid', {
                    templateUrl: 'partials/user/view.html',
                    controller: 'ProfileViewCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/register', {
                    templateUrl: 'partials/user/register.html',
                    controller: 'RegisterCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/bot/:bid', {
                    templateUrl: 'partials/bot/view.html',
                    controller: 'BotViewCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/bot/edit/:bid', {
                    templateUrl: 'partials/bot/edit.html',
                    controller: 'EditCtrl',
                    controllerAs: 'ctrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .run(checkLoggedin);

    function checkLoggedin($http, $rootScope, $location) {
        $rootScope.logout = logout($http, $rootScope, $location);
        return $http.get('/arcus/api/session').then(
            function (response) {
                $rootScope.currentUser = response.data;
            },
            function (error) {
                console.log("Error checking session: " + JSON.stringify(error));
            }
        )
    }

    function logout($http, $rootScope, $location) {
        return function () {
            console.log("jankd");

            $http.post("/arcus/api/logout").then(
                function (response) {
                    console.log("jank");
                    $rootScope.currentUser = null;
                    $rootScope.initializeSidenav();
                    $location.url("/");
                });
        }
    }

    function logoutNow($http, $rootScope, $location, $window) {
        $http.post("/arcus/api/logout").then(
            function (response) {
                console.log("jank");
                $rootScope.currentUser = null;
                $rootScope.initializeSidenav();
                $window.history.back();
            });
    }
})();