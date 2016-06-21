(function () {
    function ArcusCtrl($scope, $rootScope) {
        var vm = this;

        $rootScope.currentPageTitle = 'Home';
    }

    angular.module('Arcus')
        .controller('ArcusCtrl', ['$scope', '$rootScope', ArcusCtrl])
})
();