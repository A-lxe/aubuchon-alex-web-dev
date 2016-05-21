var app = angular.module('App', [
    'ngMaterial',
    'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html'
        })
        .when('/register', {
            templateUrl: 'register.html'
        })
        .when('/profile', {
            templateUrl: 'profile.html'
        })
        .when('/sites', {
            templateUrl: 'website/list.html'
        })
        .when('/new', {
            templateUrl: 'website/new.html'
        })
        .when('/websites/web1/edit', {
            templateUrl: 'website/edit.html'
        })
        .when('/websites/web1', {
            templateUrl: 'website/page/list.html'
        })
        .when('/websites/web1/new-page', {
            templateUrl: 'website/page/new.html'
        })
        .when('/websites/web1/page1/edit', {
            templateUrl: 'website/page/edit.html'
        })
        .when('/websites/web1/page1', {
            templateUrl: 'website/page/widget/list.html'
        })
        .otherwise({
            redirectTo: '/login'
        })
});

app.controller('MenuCtrl', function Ctrl() {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
});
