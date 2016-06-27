module.exports = function (app, models) {

    var passport = require('passport');
    var CB = models.cbModel;

    app.post('/arcus/api/cb', checkAuthenticated, create);
    app.get('/arcus/api/cb/:cbId', findById);
    app.patch('/arcus/api/cb', checkAuthenticated, update);
    app.delete('/arcus/api/cb/:cbId', checkAuthenticated, deleteCB);
    app.post('/arcus/api/cb/:cbId/comment', checkAuthenticated, addComment);
    app.patch('/arcus/api/cb/:cbId/comment', checkAuthenticated, updateComment);
    app.delete('/arcus/api/cb/:cbId/comment/:cmId', checkAuthenticated, deleteComment);
    app.get('/arcus/api/comment/:cmId', findCommentById);
    app.get('/arcus/api/cb/:cbId/comment', getComments);
    
    
    function checkAuthenticated(req, res, next) {
        if(req.isAuthenticated() && req.user) {
            next();
        } else {
            res.status(401);
        }
    }

    function create(req, res) {
        var newCB = req.body;
        newCB.owner = req.user._id;
        if(!newCB.root) {
            res.status(500);
            res.json({message: "No root specified."});
            return;
        }
        CB.create(newCB).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(500);
                res.json(error);
            }
        )
    }

    function addComment(req, res) {
        var cbId = req.params.cbId;
        var comment = req.body;
        comment.block = cbId;
        comment.owner = req.user._id;

        CB.addComment(cbId, comment).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(500);
                res.json(error);
            }
        );
    }

    function findById(req, res) {
        var id = req.params.cbId;

        CB.findById(id).then(
            function (response) {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "CB with ID: " + id + " not found."});
                }
            },
            function (error) {
                res.status(404).json({error: error});
            }
        )
    }

    function update(req, res) {
        var cb = req.body;
        var id = cb._id;

        CB.findById(id).then(
            function (response) {
                if(response.owner == req.user._id) {
                    CB.update(id, cb).then(
                        function (response) {
                            res.json(response);
                        },
                        function (error) {
                            res.status(404).json({error: "CB with ID: " + id + " not found."});
                        }
                    )
                } else {
                    res.status(402);
                }
            },
            function (error) {
                res.status(404).json({error: error});
            }
        )
        
    }

    function deleteCB(req, res) {
        var id = req.params.cbId;

        CB.findById(id).then(
            function (response) {
                if(response.owner == req.user._id) {
                    CB.deleteCB(id).then(
                        function (response) {
                            res.json(response);
                        },
                        function (error) {
                            res.status(404).json({error: "CB with ID: " + id + " not found."});
                        }
                    )
                } else {
                    res.status(402);
                }
            },
            function (error) {
                res.status(404).json({error: error});
            }
        )
    }

    function updateComment(req, res) {
        CB.findCommentById(req.body._id).then(
            function(comment) {
                if(req.user._id == comment.owner) {
                    CB.updateComment(req.params.cbId, req.body).then(
                        function(comment) {
                            res.json(comment);
                        },
                        function(error) {
                            res.status(500);
                            res.json(error);
                        }
                    );
                } else {
                    res.status(402);
                    res.json({message: 'Not authorized to delete this comment.'});
                }
            },
            function(error) {
                res.status(404);
                res.json(error);
            }
        )
    }

    function deleteComment(req, res) {
        CB.findCommentById(req.params.cmId).then(
            function(comment) {
                if(req.user._id != comment.owner) {
                    CB.deleteComment(req.params.cbId, req.params.cmId).then(
                        function(comment) {
                            res.json(comment);
                        },
                        function(error) {
                            res.status(500);
                            res.json(error);
                        }
                    );
                } else {
                    console.log(req.user._id + ' ' + comment.owner);
                    res.status(401);
                    res.json({message: 'Not authorized to delete this comment.'});
                }
            },
            function(error) {
                res.status(404);
                res.json(error);
            }
        )
    }

    function findCommentById(req, res) {
        CB.findCommentById(req.params.cmId).then(
            function(comment) {
                res.json(comment);
            },
            function(error) {
                res.status(404);
                res.json(error);
            }
        );
    }

    function getComments(req, res) {
        var cbId = req.params.cbId;
        new Promise(function(resolve, reject) {
            CB.findById(cbId).then(
                function(cb) {
                    var commentPromises = [];
                    for(var i in cb.comments) {
                        commentPromises.push(CB.findCommentById(cb.comments[i]));
                    }
                    Promise.all(commentPromises).then(
                        function(comments) {
                            resolve(comments);
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
        }).then(
            function(result) {
                res.json(result);
            },
            function(error) {
                res.status(400);
                res.json(error);
            }
        )
    }
};
