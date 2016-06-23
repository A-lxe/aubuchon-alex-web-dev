(function () {
    function ArcusCtrl($scope, $rootScope) {
        var vm = this;

        $rootScope.currentPageTitle = 'Arcus';
    }

    angular.module('Arcus')
        .controller('ArcusCtrl', ['$scope', '$rootScope', ArcusCtrl])
})
();