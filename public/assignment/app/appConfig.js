(function () {
    angular.module('App')
        .config(function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'https://www.youtube.com/**'
            ]);
        })
        .config(function ($routeProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'partials/user/login.html',
                    controller: "LoginCtrl",
                    controllerAs: "ctrl"
                })
                .when('/register', {
                    templateUrl: 'partials/user/register.html',
                    controller: "RegisterCtrl",
                    controllerAs: "ctrl"
                })
                .when('/user/:uid', {
                    templateUrl: 'partials/user/profile.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'ctrl',
                    resolve: {loggedin: checkLoggedin}
                })
                .when('/user/:uid/website', {
                    templateUrl: 'partials/website/list.html',
                    controller: 'WebsiteListCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/user/:uid/website/new', {
                    templateUrl: 'partials/website/new.html',
                    controller: 'WebsiteNewCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/user/:uid/website/:wid', {
                    templateUrl: 'partials/website/edit.html',
                    controller: 'WebsiteEditCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/user/:uid/website/:wid/page', {
                    templateUrl: 'partials/page/list.html',
                    controller: "PageListCtrl",
                    controllerAs: 'ctrl'
                })
                .when('/user/:uid/website/:wid/page/new', {
                    templateUrl: 'partials/page/new.html',
                    controller: "PageNewCtrl",
                    controllerAs: "ctrl"
                })
                .when('/user/:uid/website/:wid/page/:pid', {
                    templateUrl: 'partials/page/edit.html',
                    controller: "PageEditCtrl",
                    controllerAs: "ctrl"
                })
                .when('/user/:uid/website/:wid/page/:pid/widget', {
                    templateUrl: 'partials/widget/list.html',
                    controller: "WidgetListCtrl",
                    controllerAs: 'ctrl'
                })
                .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                    templateUrl: 'partials/widget/new.html',
                    controller: 'WidgetNewCtrl',
                    controllerAs: 'ctrl'
                })
                .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                    templateUrl: 'partials/widget/edit.html',
                    controller: "WidgetEditCtrl",
                    controllerAs: 'ctrl'
                })
                .otherwise({
                    redirectTo: '/login'
                });
        });
    
    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
})();