(function () {
    function WidgetEditCtrl(Widget, Page, Website, $routeParams, $mdDialog, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteName = Website.findWebsiteById(vm.websiteId).name;
        vm.pageId = $routeParams["pid"];
        vm.pageName = Page.findPageById(vm.pageId).name;
        vm.widgetId = $routeParams["wgid"];
        vm.widget = Widget.findWidgetById(vm.widgetId);
        
        vm.save = function () {
            Widget.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        
        vm.delete = function () {
            showDeleteConfirm(vm.widgetId, vm.widget.widgetType);
        }

        function showDeleteConfirm(widgetId, widgetType) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + widgetType)
                .textContent('Are you sure you want to delete this ' + widgetType + ' widget?')
                .ariaLabel('Delete ' + widgetType)
                .ok('Please do it!')
                .cancel('Sounds like a scam...');
            $mdDialog.show(confirm).then(function () {
                Widget.deleteWidget(widgetId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }, function () {
                return false;
            });
        }
    }

    angular.module('App')
        .controller('WidgetEditCtrl', ['Widget', 'Page', 'Website', '$routeParams', '$mdDialog', '$location', WidgetEditCtrl])
})();