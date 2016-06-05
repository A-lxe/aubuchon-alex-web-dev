(function () {
    function WidgetEditCtrl(Widget, Page, Website, $routeParams, $mdDialog, $location) {
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
        vm.widgetId = $routeParams["wgid"];
        Widget.findWidgetById(vm.widgetId).then(
            function(response) {
                vm.widget = response.data;
            },
            function(error) {
                console.log("Could not load widget. Error: " + error.data.error);
            }
        );
        
        vm.save = function () {
            Widget.updateWidget(vm.widgetId, vm.widget).then(
                function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                },
                function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Widget could not be edited. Error: ' + error.data.error)
                            .hideDelay(3000)
                    );
                }
            );
        };
        
        vm.delete = function () {
            showDeleteConfirm(vm.widgetId, vm.widget.widgetType);
        };

        function showDeleteConfirm(widgetId, widgetType) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + widgetType)
                .textContent('Are you sure you want to delete this ' + widgetType + ' widget?')
                .ariaLabel('Delete ' + widgetType)
                .ok('Please do it!')
                .cancel('Sounds like a scam...');
            $mdDialog.show(confirm).then(function () {
                Widget.deleteWidget(widgetId).then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function(error) {
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
    }

    angular.module('App')
        .controller('WidgetEditCtrl', ['Widget', 'Page', 'Website', '$routeParams', '$mdDialog', '$location', WidgetEditCtrl])
})();