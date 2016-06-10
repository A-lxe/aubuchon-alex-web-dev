module.exports = function (app, models) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);


    var Page = models.pageModel;

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        Page.createPage(websiteId, newPage).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(400).json({error: error});
            }
        )
    }

    function findAllPagesForWebsite(req, res) {
        var id = req.params.websiteId;

        Page.findAllPagesForWebsite(id).then(
            function(response) {
                if(response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: error});
                }
            },
            function(error) {
                res.status(404).json({error: error});
            }
        )
    }

    function findPageById(req, res) {
        var id = req.params.pageId;

        Page.findPageById(id).then(
            function(response) {
                if(response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Page with ID: " + id + " not found."});
                }
            },
            function(error) {
                res.status(404).json({error: error});
            }
        )
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var page = req.body;

        Page.updatePage(id, page).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404).json({error: "Page with ID: " + id + " not found."});
            }
        )
    }

    function deletePage(req, res) {
        var id = req.params.pageId;

        Page.deletePage(id).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404).json({error: "Page with ID: " + id + " not found."});
            }
        )
    }
}
