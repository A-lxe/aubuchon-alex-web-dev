(function () {
    function WidgetListCtrl(Widget, Page, Website, $routeParams, $mdDialog) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websiteName = Website.findWebsiteById(vm.websiteId).name;
        vm.pageId = $routeParams["pid"];
        vm.pageName = Page.findPageById(vm.pageId).name;
        vm.widgets = Widget.findWidgetsByPageId(vm.pageId);

        vm.delete = function (widgetId) {
            showDeleteConfirm(widgetId, Widget.findWidgetById(widgetId).widgetType);
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
                removeWidget(widgetId);
            }, function () {
                return false;
            });
        }

        function removeWidget(widgetId) {
            for (i in vm.widgets) {
                if(vm.widgets[i]._id == widgetId) {
                    vm.widgets.splice(i, 1);
                }
            }
        }
    }

    angular.module('App')
        .controller('WidgetListCtrl', ['Widget', 'Page', 'Website', '$routeParams', '$mdDialog', WidgetListCtrl])
})();