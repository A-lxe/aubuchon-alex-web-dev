(function () {
    function PageNewCtrl(Page, Website, $routeParams, $location, $mdToast) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteName = Website.findWebsiteById(vm.websiteId).name;

        vm.name = "";
        vm.title = "";
        vm.description = "";
        vm.nameWarning = false;

        vm.save = function () {
            var newPage = {
                _id: -1,
                name: vm.name,
                title: vm.title,
                description: vm.description,
                developerId: vm.userId};
            newPage = Page.createPage(vm.userId, newPage);
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
        .controller('PageNewCtrl', ['Page', 'Website', '$routeParams', '$location', '$mdToast', PageNewCtrl])
})();