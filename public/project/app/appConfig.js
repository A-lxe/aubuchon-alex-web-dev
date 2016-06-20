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
                .otherwise({
                    redirectTo: '/'
                });
        });

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            if (!$rootScope.logout) {
                $rootScope.logout = logout($http, $rootScope, $location);
            }
            if (user) {
                if (!$rootScope.currentUser || !($rootScope.currentUser._id == user._id)) {
                    $rootScope.currentUser = user;
                    $location.url($location.url() + "/" + user._id);
                }
                deferred.resolve();
            } else {
                $location.url('/');
                deferred.reject();
            }
        });
        return deferred.promise;
    };

    function logout($http, $rootScope, $location) {
        return function() {
            $http.post("/api/logout").then(
                function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }
    }
})();