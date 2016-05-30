(function () {
    function PageEditCtrl(Page, Website, $routeParams, $location, $mdToast) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteName = Website.findWebsiteById(vm.websiteId).name;
        vm.pageId = $routeParams["pid"];
        vm.page = Page.findPageById(vm.pageId);
        vm.initialName = vm.page.name;
        
        vm.nameWarning = false;

        vm.save = function () {
            var newPage = vm.page;
            newPage = Page.updatePage(vm.pageId, newPage);
            if(newPage) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + newPage._id + "/widget");
            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Page could not be created!')
                        .hideDelay(3000)
                );
            }
        }

        vm.validateName = function() {
            if(Page.pageWithName(vm.websiteId, vm.name)) {
                vm.nameWarning = "A Page with this name already exists!";
            } else {
                vm.nameWarning = false;
            }
        }
    }

    angular.module('App')
        .controller('PageEditCtrl', ['Page', 'Website', '$routeParams', '$location', '$mdToast', PageEditCtrl])
})();