(function () {
    function WebsiteListCtrl(Website, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websites = Website.findWebsitesByUser(vm.userId);
        vm.columns = 2;

        vm.sitesArray = [];
        var j = 0;
        while(j < vm.columns) {
            vm.sitesArray.push([]);
            j++;
        }
        for(i in vm.websites) {
            vm.sitesArray[(i % vm.columns)].push(vm.websites[i]);
        }
    }

    angular.module('App')
        .controller('WebsiteListCtrl', ['Website', '$routeParams', WebsiteListCtrl])
})();