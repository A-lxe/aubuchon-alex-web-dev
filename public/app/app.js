(function () {
    angular.module('WebDev', [
        'ngRoute',
        'ngMaterial'])
        .controller('MainCtrl', ['$scope', MainCtrl]);
    
    function MainCtrl($scope) {
        var vm = this;

        $scope.currentNavItem = 'about';
        $scope.goto = function(title) {
            $scope.currentNavItem = title;
        }
    }
})();

