var app = angular.module('App', [
    'ngMaterial',
    'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html'
        })
        .otherwise({
            redirectTo: '/login'
        })
});
