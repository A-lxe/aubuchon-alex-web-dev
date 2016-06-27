(function () {
    function ProfileViewCtrl(User, Bot, CommentBlock, $scope, $rootScope, $window, $route, $routeParams, $mdToast) {
        var vm = this;
        vm.bots = []
        vm.botsLeft = [];
        vm.botsRight = [];
        vm.canComment = $rootScope.currentUser

        User.retrieveSingle($routeParams["uid"]).then(
            function(response) {
                vm.user = response.data;
                $rootScope.currentPageTitle = vm.user.discord.username || vm.user.username;
                loadComments();
            },
            function(error) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Couldn't find that user.")
                        .hideDelay(3000)
                );
                $window.history.back()
            }
        )

        Bot.findByUserId($routeParams["uid"]).then(
            function (response) {
                for (var i in response.data) {
                    vm.bots.push(response.data[i]);
                    if (i % 2 == 0) {
                        vm.botsLeft.push(response.data[i]);
                    } else {
                        vm.botsRight.push(response.data[i]);
                    }
                }
            }
        )

        vm.postComment = function () {
            if (vm.canComment) {
                CommentBlock.addComment(vm.user.comments,
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
            CommentBlock.getComments(vm.user.comments).then(
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
        .controller('ProfileViewCtrl', ['User', 'Bot', 'CommentBlock', '$scope', '$rootScope', '$window', '$route', '$routeParams', '$mdToast', ProfileViewCtrl])
})
();