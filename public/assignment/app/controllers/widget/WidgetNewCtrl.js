(function () {
    function WidgetNewCtrl(Widget, Page, Website, $routeParams, $mdToast, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteName = Website.findWebsiteById(vm.websiteId).name;
        vm.pageId = $routeParams["pid"];
        vm.pageName = Page.findPageById(vm.pageId).name;

        vm.new = function(type) {
            var newWidget = {}
            switch(type) {
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
            if((newWidget = Widget.createWidget(vm.pageId, newWidget))) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
            } else {
                throwError();
            }
        }
        
        function throwError() {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Widget could not be created!')
                    .hideDelay(3000)
            );
        }
    }

    angular.module('App')
        .controller('WidgetNewCtrl', ['Widget', 'Page', 'Website', '$routeParams', '$mdToast', '$location', WidgetNewCtrl])
})();