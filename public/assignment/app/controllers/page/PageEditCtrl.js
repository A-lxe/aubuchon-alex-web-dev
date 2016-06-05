(function () {
    function PageEditCtrl(Page, Website, $routeParams, $location, $mdToast) {
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
        vm.pageId = $routeParams["pid"];
        Page.findPageById(vm.pageId).then(
            function (response) {
                vm.page = response.data;
                vm.initialName = vm.page.name;
            },
            function (error) {
                console.log("Could not load page. Error: " + error.data.error);
                $location("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        );

        vm.nameWarning = false;

        vm.save = function () {
            var newPage = vm.page;
            Page.updatePage(vm.pageId, newPage).then(
                function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + response.data._id + "/widget");
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Page could not be edited. Error: ' + error.data.error)
                            .hideDelay(3000)
                    );
                }
            );
        }
    }

    angular.module('App')
        .controller('PageEditCtrl', ['Page', 'Website', '$routeParams', '$location', '$mdToast', PageEditCtrl])
})();