module.exports = function (app, models) {

    var passport = require('passport');
    var CB = models.cbModel;

    app.post('/arcus/api/cb', checkAuthenticated, create);
    app.post('/arcus/api/cb/:cbId', checkAuthenticated, addComment);
    app.get('/arcus/api/cb/:cbId', findById);
    app.patch('/arcus/api/cb', checkAuthenticated, update);
    app.delete('/arcus/api/cb/:cbId', checkAuthenticated, deleteCB);

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
        comment.user = req.user._id;

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

        CB.deleteCB(id).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "CB with ID: " + id + " not found."});
            }
        )
    }
};
