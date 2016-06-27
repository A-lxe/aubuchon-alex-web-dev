(function () {
    function CommentBlock($http, $rootScope) {

        return {
            create: create, 
            findById: findById,
            update: update,
            deleteCB: deleteCB,
            addComment: addComment,
            updateComment: updateComment,
            deleteComment: deleteComment,
            findCommentById: findCommentById,
            getComments: getComments
        }

        function create(cb) {
            return $http.post("/arcus/api/cb", cb);
        }

        function findById(cbId) {
            return $http.get("/arcus/api/cb/" + cbId);
        }

        function update(cb) {
            return $http.patch("/arcus/api/cb", cb);
        }

        function deleteCB(cbId) {
            return $http.delete("/arcus/api/cb/" + cbId);
        }

        function addComment(cbId, comment) {
            return $http.post("/arcus/api/cb/" + cbId + "/comment", comment);
        }

        function updateComment(cbId, comment) {
            return $http.patch("/arcus/api/cb/" + cbId + "/comment", comment);
        }

        function deleteComment(cbId, comment) {
            return $http.delete("/arcus/api/cb/" + cbId + "/comment/" + comment._id);
        }

        function findCommentById(cmId) {
            return $http.get("/arcus/api/comment/" + cmId);
        }

        function getComments(cbId) {
            return $http.get('/arcus/api/cb/' + cbId + '/comment')
        }

    }

    angular.module('Arcus')
        .factory('CommentBlock', ['$http', '$rootScope', CommentBlock])
})();