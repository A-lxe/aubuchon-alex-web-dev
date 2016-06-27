angular.module('Arcus')
    .directive('arcComment', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/arcComment/comment.html',
            controller: ['$scope', '$rootScope', 'CommentBlock', 'User', '$route', '$mdDialog', ctrl],
            scope: {
                comment: '=comment',
                commentBlock: '=block'
            }
        };

        function ctrl($scope, $rootScope, CommentBlock, User, $route, $mdDialog) {
            $scope.elevated = false;
            new Promise(function(resolve, reject) {
                    User.retrieveSingle($scope.comment.owner).then(
                        function (user) {
                            $scope.owner = user.data;
                            resolve();
                        },
                        function(error) {reject(error)}
                    )
            }).then(
                function(comment) {
                    if($rootScope.currentUser._id == $scope.comment.owner) {
                        $scope.elevated = true;
                    }
                },
                function(error) {
                    $scope.error = error;
                }
            );

            $scope.deleteComment = function () {
                var confirm = $mdDialog.confirm()
                    .title('Delete Comment')
                    .textContent('Are you sure you want to delete this comment?')
                    .ok('It must be done.')
                    .cancel('On second thought...');
                $mdDialog.show(confirm).then(function () {
                    CommentBlock.deleteComment($scope.commentBlock, $scope.comment).then(
                        function(response) {
                            $route.reload();
                        }
                    )
                });
            }
        }
    });