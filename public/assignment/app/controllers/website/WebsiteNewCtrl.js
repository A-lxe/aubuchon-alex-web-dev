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
                developerId: vm.userId
            };
            Website.createWebsite(vm.userId, newSite).then(
                function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + response._id + "/page");
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
        .controller('WebsiteNewCtrl', ['Website', '$routeParams', '$location', '$mdToast', WebsiteNewCtrl])
})();