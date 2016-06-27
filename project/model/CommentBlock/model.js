module.exports = (function () {

    var mongoose = require("mongoose");
    var Schemas = require("./schema.js");
    var CBSchema = Schemas.CBSchema;
    var CommentSchema = Schemas.CommentSchema;
    var CB = mongoose.model("CommentBlock", CBSchema);
    var Comment = mongoose.model("Comment", CommentSchema);

    var api = {
        create: create,
        findById: findById,
        update: update,
        deleteCB: deleteCB,
        addComment: addComment,
        updateComment: updateComment,
        deleteComment: deleteComment,
        findCommentById: findCommentById
    };
    return api;

    function create(cb) {
        var theCB = new CB(cb);
        return theCB.save();
    }


    function findById(cbId) {
        return CB.findById(cbId);
    }

    function update(cbId, newCB) {
        return CB.update(
            {_id: cbId},
            {
                $set: {
                    root: newCB.root,
                    owner: newCB.owner,
                    comments: newCB.comments
                }
            }
        );
    }

    function deleteCB(cbId) {
        return CB.remove({_id: cbId});
    }

    function addComment(cbId, comment) {
        return new Promise(function(resolve, reject) {
            CB.findById(cbId).then(
                function(cb) {
                    Comment.create(comment).then(
                        function(savedComment) {
                            cb.comments.unshift(savedComment._id);
                            CB.update(
                                {_id: cbId},
                                {
                                    $set: {
                                        comments: cb.comments
                                    }
                                }
                            ).then(
                                function(response) {
                                    resolve(response);
                                },
                                function(error) {
                                    reject(error);
                                }
                            )
                        },
                        function(error) {
                            reject(error);
                        }
                    )
                },
                function(error) {
                    reject(error);
                }
            )
        });
    }

    function updateComment(cbId, comment) {
        return new Promise(function(resolve, reject) {
            CB.findById(cbId).then(
                function(cb) {
                    var exists = false;
                    for(var i in cb.comments) {
                        exists = exists || cb.comments[i] == comment._id;
                    }
                    if(exists) {
                        Comment.update(
                            {_id: comment._id},
                            {
                                $set: {
                                    content: comment.content
                                }
                            }
                        ).then(
                            function(response) {
                                resolve(response);
                            },
                            function(error) {
                                reject(error);
                            }
                        )
                    } else {
                        reject({message: "CommentBlock Not Found."});
                    }
                },
                function(error) {
                    reject(error);
                }
            )
        })
    }
    
    function deleteComment(cbId, cmId) {
        return new Promise(function(resolve, reject) {
            CB.findById(cbId).then(
                function(cb) {
                    var exists = false;
                    for(var i in cb.comments) {
                        exists = exists || cb.comments[i] == cmId;
                }
                    if(exists) {
                        Comment.remove({_id: cmId}).then(
                            function(response) {
                                resolve(cb);
                            },
                            function(error) {
                                reject(error);
                            }
                        )
                    } else {
                        reject({message: "CommentBlock Not Found."});
                    }
                },
                function(error) {
                    reject(error);
                }
            )
        })
    }
    
    function findCommentById(commentId) {
        return Comment.findById(commentId);
    }
})();