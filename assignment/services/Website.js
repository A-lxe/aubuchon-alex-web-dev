module.exports = function(app) {
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function createWebsite(req, res) {
        var newWebsite = req.body
        var userId = req.params.userId;
        if(websiteWithName(userId, newWebsite.name)) {
            res.status(400).json({error: "Website " + newWebsite.name + " already exists."});
            return;
        }
        newWebsite._id = newId();
        newWebsite.developerId = userId;
        newWebsite.description = "";
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var out = [];
        for(i in websites) {
            if(websites[i].developerId == userId) {
                out.push(websites[i]);
            }
        }
        res.json(out);
    }

    function findWebsiteById(req, res) {
        var id = req.params.websiteId;
        for(i in websites) {
            if(websites[i]._id == id) {
                res.json(websites[i]);
                return;
            }
        }
        res.status(404).json({error: "Website with ID: " + id + " not found."});
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var website = req.body;
        for(i in websites) {
            if(websites[i]._id == id) {
                var old = websites[i];
                websites[i] = {
                    _id : id,
                    name : website.name || old.name,
                    description : website.description || old.description,
                    developerId : website.developerId || old.developerId
                }
                res.json(websites[i]);
                return;
            }
        }
        res.status(404).json({error: "Website with ID: " + id + " not found."});
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for(i in websites) {
            if(websites[i]._id == id) {
                websites[i].splice(i, 1);
                res.end()
                return;
            }
        }
        res.status(404).json({error: "Website with ID: " + id + " not found."});
    }

    function newId() {
        var temp = 0;
        for(i in websites) {
            temp = Math.max(websites[i]._id, temp);
        }
        return temp + 1;
    }

    function websiteWithName(name) {
        for(i in websites) {
            if(websites[i].name === name) {
                return true;
            }
        }
        return false;
    }
}
