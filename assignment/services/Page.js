module.exports = function (app) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    function createPage(req, res) {
        var newPage = req.body
        var websiteId = req.params.websiteId;
        newPage._id = newId();
        newPage.websiteId = websiteId;
        newPage.name = newPage.name || "";
        newPage.title = newPage.title || "";
        newPage.description = newPage.description || "";
        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var out = [];
        for (i in pages) {
            if (pages[i].websiteId == websiteId) {
                out.push(pages[i]);
            }
        }
        res.json(out);
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        for (i in pages) {
            if (pages[i]._id == id) {
                res.json(pages[i]);
                return;
            }
        }
        res.status(404).json({error: "Page with ID: " + id + " not found."});
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var page = req.body;
        for (i in pages) {
            if (pages[i]._id == id) {
                var old = pages[i];
                pages[i] = {
                    _id: id,
                    name: page.name || old.name,
                    title: page.title || old.title,
                    description: page.description || old.description,
                    websiteId: page.websiteId || old.websiteId
                }
                res.json(pages[i]);
                return;
            }
        }
        res.status(404).json({error: "Page with ID: " + id + " not found."});
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        for (i in pages) {
            if (pages[i]._id == id) {
                pages.splice(i, 1);
                res.end()
                return;
            }
        }
        res.status(404).json({error: "Page with ID: " + id + " not found."});
    }

    function newId() {
        var temp = 0;
        for (i in pages) {
            temp = Math.max(pages[i]._id, temp);
        }
        return temp + 1;
    }
}
