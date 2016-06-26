module.exports = (function () {

    var mongoose = require("mongoose");
    var CBSchema = require("./schema.js");
    var CB = mongoose.model("CB", CBSchema);

    var api = {
        create: create,
        findById: findById,
        update: update,
        deleteCB: deleteCB,
        addComment: addComment
    };
    return api;

    function create(cb) {
        var theCB = new CB(cb);
        return theCB.save();
    }

    function addComment(cbId, comment) {
        return new Promise(function(resolve, reject) {
            CB.findById(cbId).then(
                function(cb) {
                    cb.comments.push(comment);
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
        });
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
                    comments: newCB.comments
                }
            }
        );
    }

    function deleteCB(cbId) {
        return CB.remove({_id: cbId});
    }
})();