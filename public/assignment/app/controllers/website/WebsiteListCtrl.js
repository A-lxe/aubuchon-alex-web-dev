(function () {
    function WebsiteListCtrl(Website, $routeParams, $mdDialog) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websites = Website.findWebsitesByUser(vm.userId);
        vm.columns = 2;

        vm.sitesArray = [];
        var j = 0;
        while (j < vm.columns) {
            vm.sitesArray.push([]);
            j++;
        }
        for (i in vm.websites) {
            vm.sitesArray[(i % vm.columns)].push(vm.websites[i]);
        }

        vm.delete = function (websiteId) {
            showDeleteConfirm(websiteId, Website.findWebsiteById(websiteId).name);
        }

        function showDeleteConfirm(websiteId, websiteName) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + websiteName)
                .textContent('Are you sure you want to delete ' + websiteName + '?')
                .ariaLabel('Delete ' + websiteName)
                .ok('Please do it!')
                .cancel('Sounds like a scam...');
            $mdDialog.show(confirm).then(function () {
                Website.deleteWebsite(websiteId);
                removeSite(websiteId);
            }, function () {
                return false;
            });
        }

        function removeSite(websiteId) {
            for (i in vm.sitesArray) {
                for (j in vm.sitesArray[i]) {
                    if (vm.sitesArray[i][j]._id == websiteId) {
                        vm.sitesArray[i].splice(j, 1);
                        if(vm.sitesArray[i].length == 0) {
                            vm.sitesArray.splice(i, 1);
                        }
                    }
                }
            }
        }
    }

    angular.module('App')
        .controller('WebsiteListCtrl', ['Website', '$routeParams', '$mdDialog', WebsiteListCtrl])
})();