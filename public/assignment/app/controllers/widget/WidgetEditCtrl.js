(function () {
    function WidgetEditCtrl(Widget, Page, Website, $routeParams, $mdDialog, $location, Upload, Flickr) {
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
            function (response) {
                vm.widget = response.data;
            },
            function (error) {
                console.log("Could not load widget. Error: " + error.data.error);
            }
        );

        vm.save = function () {
            Widget.updateWidget(vm.widgetId, vm.widget).then(
                function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                },
                function (error) {
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
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
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

        vm.uploadImage = function (file, errFiles) {
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/upload',
                    data: {image: file, name: "hello"}
                }).then(
                    function (response) {
                        vm.widget.url = response.data.path;
                        vm.widget.upload = true;
                    },
                    function (response) {
                        if (response.status > 0)
                            console.log(response.status + ': ' + response.data);
                    },
                    function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
            }
        }

        vm.removeUpload = function() {
            if(vm.widget.upload) {
                vm.widget.url = "http://lorempixel.com/400/200/";
                vm.widget.upload = false;
            }
        }

        vm.searchPhotos = function(searchTerm) {
            Flickr
                .searchPhotos(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        vm.selectPhoto = function(photo) {
            vm.widget.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.upload = false;
        }
    }

    angular.module('App')
        .controller('WidgetEditCtrl', ['Widget', 'Page', 'Website', '$routeParams', '$mdDialog', '$location', 'Upload', 'Flickr', WidgetEditCtrl])
})();