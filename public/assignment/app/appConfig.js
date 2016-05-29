(function() {
    angular.module('App')
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
                    controllerAs: 'ctrl'
                })
                .when('/user/:uid/website', {
                    templateUrl: 'partials/website/list.html'
                })
                .when('/user/:uid/website/new', {
                    templateUrl: 'partials/website/new.html'
                })
                .when('/user/:uid/website/:wid', {
                    templateUrl: 'partials/website/edit.html'
                })
                .when('/user/:uid/website/:wid/page', {
                    templateUrl: 'partials/page/list.html'
                })
                .when('/user/:uid/website/:wid/page/new', {
                    templateUrl: 'partials/page/new.html'
                })
                .when('/user/:uid/website/:wid/page/:pid', {
                    templateUrl: 'partials/page/edit.html'
                })
                .when('/user/:uid/website/:wid/page/:pid/widget', {
                    templateUrl: 'partials/widget/list.html'
                })
                .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                    templateUrl: 'partials/widget/new.html'
                })
                .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                    templateUrl: 'partials/widget/edit.html'
                })
                .when('/websites/web1/page1/header', {
                    templateUrl: 'partials/widget/header.html'
                })
                .when('/websites/web1/page1/image', {
                    templateUrl: 'partials/widget/image.html'
                })
                .when('/websites/web1/page1/video', {
                    templateUrl: 'partials/widget/video.html'
                })
                .otherwise({
                    redirectTo: '/login'
                })
        });
})();