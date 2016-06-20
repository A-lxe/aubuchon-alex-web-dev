(function () {
    function ArcusCtrl($scope, $rootScope) {
        var vm = this;

        $rootScope.currentPageTitle = 'Home';
        console.log("done");
    }

    angular.module('Arcus')
        .controller('ArcusCtrl', ['$scope', '$rootScope', ArcusCtrl])
})
();