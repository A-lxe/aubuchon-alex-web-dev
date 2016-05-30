(function () {
    function WebsiteEditCtrl(Website, $routeParams, $location, $mdToast) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.website = Website.findWebsiteById(vm.websiteId);
        vm.initialName = vm.website.name
        vm.nameWarning = false;

        vm.save = function () {
            var newSite = vm.website;
            newSite = Website.updateWebsite(vm.websiteId, newSite);
            if(newSite && !vm.nameWarning) {
                $location.url("/user/" + vm.userId + "/website/" + newSite._id + "/page");
            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Website could not be created!')
                        .hideDelay(3000)
                );
            }
        }

        vm.validateName = function() {
            if(vm.initialName !== vm.website.name && Website.websiteWithName(vm.userId, vm.website.name)) {
                vm.nameWarning = "A website with this name already exists!";
            } else {
                vm.nameWarning = false;
            }
        }
    }

    angular.module('App')
        .controller('WebsiteEditCtrl', ['Website', '$routeParams', '$location', '$mdToast', WebsiteEditCtrl])
})();