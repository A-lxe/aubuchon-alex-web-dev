(function () {
    function WebsiteListCtrl(Website, $routeParams, $mdDialog, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.columns = 2;
        vm.sitesArray = [];

        Website.findWebsitesByUser(vm.userId).then(
            function(response) {
                vm.websites = response.data;
                var j = 0;
                while (j < vm.columns) {
                    vm.sitesArray.push([]);
                    j++;
                }
                for (i in vm.websites) {
                    vm.sitesArray[(i % vm.columns)].push(vm.websites[i]);
                }
            },
            function(error) {
                console.log("Couldn't load websites. Error: " + error.data.error);
                $location.url("/user/" + vm.userId);
            }
        );

        vm.delete = function (websiteId, name) {
            showDeleteConfirm(websiteId, name);
        }

        function showDeleteConfirm(websiteId, websiteName) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + websiteName)
                .textContent('Are you sure you want to delete ' + websiteName + '?')
                .ariaLabel('Delete ' + websiteName)
                .ok('Please do it!')
                .cancel('Sounds like a scam...');
            $mdDialog.show(confirm).then(function () {
                Website.deleteWebsite(websiteId).then(
                    function(response) {
                        removeSite(websiteId);
                    },
                    function(error) {
                        console.log("Couldn't delete website. Error: " + error.data.error);
                    }
                );
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
        .controller('WebsiteListCtrl', ['Website', '$routeParams', '$mdDialog', '$location', WebsiteListCtrl])
})();