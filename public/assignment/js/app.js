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
        .otherwise({
            redirectTo: '/login'
        })
});

app.controller('MenuCtrl', function Ctrl() {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
        console.log("asdlfj");
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
});
