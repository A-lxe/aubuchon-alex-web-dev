module.exports = (function () {

    var mongoose = require("mongoose");
    var PageSchema = require("./schema.js");
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }

    function findPageById(pageId) {
        return Page.findById(pageId);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function updatePage(id, newPage) {
        return Page.update(
            {_id: id},
            {
                $set: {
                    name: newPage.name,
                    title: newPage.title,
                    description: newPage.description,
                    widgets: newPage.widgets
                }
            }
        );
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
})();