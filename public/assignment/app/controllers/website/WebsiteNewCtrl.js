(function () {
    function WebsiteNewCtrl(Website, $routeParams, $location, $mdToast) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        vm.name = "";
        vm.description = "";
        vm.nameWarning = false;

        vm.save = function () {
            var newSite = {
                _id: -1,
                name: vm.name,
                description: vm.description,
                developerId: vm.userId};
            newSite = Website.createWebsite(vm.userId, newSite);
            if(newSite) {
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
            if(Website.websiteWithName(vm.userId, vm.name)) {
                vm.nameWarning = "A website with this name already exists!";
            } else {
                vm.nameWarning = false;
            }
        }
    }

    angular.module('App')
        .controller('WebsiteNewCtrl', ['Website', '$routeParams', '$location', '$mdToast', WebsiteNewCtrl])
})();