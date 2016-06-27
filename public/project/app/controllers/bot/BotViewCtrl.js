(function () {
    function BotViewCtrl(Bot, CommentBlock, $scope, $rootScope, $location, $window, $route, $routeParams, $mdToast, $mdDialog) {
        var vm = this;
        vm.commentContent = "";
        vm.canComment = $rootScope.currentUser;
        Bot.findById($routeParams["bid"]).then(
            function (response) {
                vm.bot = response.data;
                $rootScope.currentPageTitle = vm.bot.name;
                if (!vm.bot) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Bot not found.')
                            .hideDelay(3000)
                    );
                    $window.history.back()
                }
                if ($rootScope.currentUser && vm.bot.owner == $rootScope.currentUser._id) {
                    vm.elevated = true;
                }
                
                loadComments();
            },
            function (error) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Bot not found.')
                        .hideDelay(3000)
                );
                $window.history.back()
            }
        );

        vm.postComment = function () {
            if (vm.canComment) {
                CommentBlock.addComment(vm.bot.comments,
                    {
                        owner: $rootScope.currentUser._id,
                        content: vm.commentContent
                    }).then(
                    function(response) {
                        $route.reload();
                    },
                    function(error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not comment: ' + error.message)
                                .hideDelay(3000)
                        );
                    }
                )
            }
        }
        
        function loadComments() {
            CommentBlock.getComments(vm.bot.comments).then(
                function (comments) {
                    vm.comments = comments.data;
                },
                function (error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Could not load comments: ' + error.message)
                            .hideDelay(3000)
                    );
                })
        }
    }

    angular.module('Arcus')
        .controller('BotViewCtrl', ['Bot', 'CommentBlock', '$scope', '$rootScope', '$location', '$window', '$route', '$routeParams', '$mdToast', '$mdDialog', BotViewCtrl])
})
();