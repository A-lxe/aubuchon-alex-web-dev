(function() {
    angular.module('App')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'partials/user/login.html'
                })
                .when('/register', {
                    templateUrl: 'partials/user/register.html'
                })
                .when('/profile', {
                    templateUrl: 'partials/user/profile.html'
                })
                .when('/sites', {
                    templateUrl: 'partials/website/list.html'
                })
                .when('/new', {
                    templateUrl: 'partials/website/new.html'
                })
                .when('/websites/web1/edit', {
                    templateUrl: 'partials/website/edit.html'
                })
                .when('/websites/web1', {
                    templateUrl: 'partials/page/list.html'
                })
                .when('/websites/web1/new-page', {
                    templateUrl: 'partials/page/new.html'
                })
                .when('/websites/web1/page1/edit', {
                    templateUrl: 'partials/page/edit.html'
                })
                .when('/websites/web1/page1', {
                    templateUrl: 'partials/widget/list.html'
                })
                .when('/websites/web1/page1/new-widget', {
                    templateUrl: 'partials/widget/new.html'
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