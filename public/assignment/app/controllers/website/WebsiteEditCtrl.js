(function () {
    function WebsiteEditCtrl(Website, $routeParams, $location, $mdToast) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        Website.findWebsiteById(vm.websiteId).then(
            function (response) {
                vm.website = response.data;
                vm.initialName = vm.website.name;
            }
        );
        vm.nameWarning = false;

        vm.save = function () {
            var newSite = vm.website;
            Website.updateWebsite(vm.websiteId, newSite).then(
                function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + response.data._id + "/page");
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Website could not be created. Error: ' + error.data.error)
                            .hideDelay(3000)
                    );
                }
            );
        }
    }

    angular.module('App')
        .controller('WebsiteEditCtrl', ['Website', '$routeParams', '$location', '$mdToast', WebsiteEditCtrl])
})();