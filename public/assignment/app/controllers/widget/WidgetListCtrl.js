(function () {
    function WidgetListCtrl(Widget, Page, Website, $routeParams, $mdDialog, $location, $sce) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        Website.findWebsiteById(vm.websiteId).then(
            function (response) {
                vm.websiteName = response.data.name;
            },
            function (error) {
                console.log("Could not load website. Error: " + error.data.error);
                $location.url("/user/" + vm.userId + "/website");
            }
        );
        vm.pageId = $routeParams["pid"];
        Page.findPageById(vm.pageId).then(
            function (response) {
                vm.pageName = response.data.name;
            },
            function (error) {
                console.log("Could not load page. Error: " + error.data.error);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        );
        Widget.findWidgetsByPageId(vm.pageId).then(
            function (response) {
                vm.widgets = response.data;
            },
            function (error) {
                console.log("Could not load widgets. Error: " + error.data.error);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        );

        vm.delete = function (widgetId, type) {
            showDeleteConfirm(widgetId, type);
        };

        vm.renderHtml = function(html)
        {
            var tmp = $sce.trustAsHtml(html);
            return tmp;
        };

        function showDeleteConfirm(widgetId, type) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + type)
                .textContent('Are you sure you want to delete this ' + type + ' widget?')
                .ariaLabel('Delete ' + type)
                .ok('Please do it!')
                .cancel('Sounds like a scam...');
            $mdDialog.show(confirm).then(function () {
                Widget.deleteWidget(widgetId).then(
                    function (response) {
                        removeWidget(widgetId);
                    },
                    function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Widget could not be deleted. Error: ' + error.data.error)
                                .hideDelay(3000)
                        );
                    }
                );
            }, function () {
                return false;
            });
        }

        function removeWidget(widgetId) {
            for (i in vm.widgets) {
                if (vm.widgets[i]._id == widgetId) {
                    vm.widgets.splice(i, 1);
                }
            }
        }
    }

    angular.module('App')
        .controller('WidgetListCtrl', ['Widget', 'Page', 'Website', '$routeParams', '$mdDialog', '$location', '$sce', WidgetListCtrl])
})();