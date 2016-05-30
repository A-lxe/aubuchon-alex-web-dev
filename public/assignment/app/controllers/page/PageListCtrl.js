(function () {
    function PageListCtrl(Page, Website, $routeParams, $mdDialog) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteName = Website.findWebsiteById(vm.websiteId).name;
        vm.pages = Page.findPagesByWebsiteId(vm.websiteId);
        vm.columns = 2;

        vm.pagesArray = [];
        var j = 0;
        while (j < vm.columns) {
            vm.pagesArray.push([]);
            j++;
        }
        for (i in vm.pages) {
            vm.pagesArray[(i % vm.columns)].push(vm.pages[i]);
        }

        vm.delete = function (pageId) {
            showDeleteConfirm(pageId, Page.findPageById(pageId).name);
        }

        function showDeleteConfirm(pageId, pageName) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + pageName)
                .textContent('Are you sure you want to delete ' + pageName + '?')
                .ariaLabel('Delete ' + pageName)
                .ok('Please do it!')
                .cancel('Sounds like a scam...');
            $mdDialog.show(confirm).then(function () {
                Page.deletePage(pageId);
                removePage(pageId);
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
        .controller('PageListCtrl', ['Page', 'Website', '$routeParams', '$mdDialog', PageListCtrl])
})();