(function () {
    function PageNewCtrl(Page, Website, $routeParams, $location, $mdToast) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        Website.findWebsiteById(vm.websiteId).then(
            function (response) {
                vm.websiteName = response.data.name;
            },
            function (error) {
                console.log("Could not load website. Error: " + error.data.error);
                $location("/user/" + vm.userId + "/website");
            }
        );

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
                websiteId: vm.websiteId
            };
            Page.createPage(vm.websiteId, newPage).then(
                function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + response._id + "/widget");
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Page could not be created. Error: ' + error.data.error)
                            .hideDelay(3000)
                    );
                }
            );
        }
    }

    angular.module('App')
        .controller('PageNewCtrl', ['Page', 'Website', '$routeParams', '$location', '$mdToast', PageNewCtrl])
})();