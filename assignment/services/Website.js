module.exports = function(app, models) {
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var Website = models.websiteModel;

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var user = req.params.userId;
        Website.createWebsiteForUser(user, newWebsite).then(
            function(response) {
                console.log(JSON.stringify(response));
                res.json(response);
            },
            function(error) {
                res.status(400).json({error: error});
            }
        )
    }


    function findAllWebsitesForUser(req, res) {
        var id = req.params.userId;

        Website.findAllWebsitesForUser(id).then(
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

    function findWebsiteById(req, res) {
        var id = req.params.websiteId;

        Website.findWebsiteById(id).then(
            function(response) {
                if(response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Website with ID: " + id + " not found."});
                }
            },
            function(error) {
                res.status(404).json({error: error});
            }
        )
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var website = req.body;

        Website.updateWebsite(id, website).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404).json({error: "Website with ID: " + id + " not found."});
            }
        )
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        Website.deleteWebsite(id).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404).json({error: "Website with ID: " + id + " not found."});
            }
        )
    }
}
