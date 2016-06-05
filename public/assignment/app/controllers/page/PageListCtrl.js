(function () {
    function PageListCtrl(Page, Website, $routeParams, $mdDialog, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.columns = 2;
        vm.pagesArray = [];
        Website.findWebsiteById(vm.websiteId).then(
            function (response) {
                vm.websiteName = response.data.name;
            },
            function (error) {
                console.log("Could not load website. Error: " + error.data.error);
                $location("/user/" + vm.userId + "/website");
            }
        );
        Page.findPagesByWebsiteId(vm.websiteId).then(
            function (response) {
                vm.pages = response.data;
                var j = 0;
                while (j < vm.columns) {
                    vm.pagesArray.push([]);
                    j++;
                }
                for (i in vm.pages) {
                    vm.pagesArray[(i % vm.columns)].push(vm.pages[i]);
                }
            },
            function (error) {
                console.log("Could not load page. Error: " + error.data.error);
                $location.url("/user/" + vm.userId + "/website");
            }
        );

        vm.delete = function (pageId, name) {
            showDeleteConfirm(pageId, name);
        }

        function showDeleteConfirm(pageId, pageName) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + pageName)
                .textContent('Are you sure you want to delete ' + pageName + '?')
                .ariaLabel('Delete ' + pageName)
                .ok('Please do it!')
                .cancel('Sounds like a scam...');
            $mdDialog.show(confirm).then(function () {
                Page.deletePage(pageId).then(
                    function(response) {
                        removePage(pageId);
                    },
                    function(error) {
                        console.log("Could not delete page. Error: " + error.data.error);
                    }
                );
            }, function () {
                return false;
            });
        }

        function removePage(pageId) {
            for (i in vm.pagesArray) {
                for (j in vm.pagesArray[i]) {
                    if (vm.pagesArray[i][j]._id == pageId) {
                        vm.pagesArray[i].splice(j, 1);
                        if(vm.pagesArray[i].length == 0) {
                            vm.pagesArray.splice(i, 1);
                        }
                    }
                }
            }
        }
    }

    angular.module('App')
        .controller('PageListCtrl', ['Page', 'Website', '$routeParams', '$mdDialog', '$location', PageListCtrl])
})();