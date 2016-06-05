(function () {
    function WidgetNewCtrl(Widget, Page, Website, $routeParams, $mdToast, $location) {
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
                vm.pageName = response.data.name;
            },
            function (error) {
                console.log("Could not load page. Error: " + error.data.error);
                $location("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        );

        vm.new = function (type) {
            var newWidget = {}
            switch (type) {
                case "HEADER":
                    newWidget.widgetType = "HEADER";
                    newWidget.text = "Header";
                    newWidget.size = 1;
                    break;
                case "IMAGE":
                    newWidget.widgetType = "IMAGE";
                    newWidget.url = "";
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.widgetType = "YOUTUBE";
                    newWidget.url = "";
                    newWidget.width = "100%";
                    break;
                default:
                    throwError();
                    return;
            }
            Widget.createWidget(vm.pageId, newWidget).then(
                function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + response.data._id);
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Widget could not be created. Error: ' + error.data.error)
                            .hideDelay(3000)
                    );
                });
        }
    }

    angular.module('App')
        .controller('WidgetNewCtrl', ['Widget', 'Page', 'Website', '$routeParams', '$mdToast', '$location', WidgetNewCtrl])
})();