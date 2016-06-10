module.exports = (function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./schema.js");
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        console.log("yaddo");
        website._user = userId;
        return Website.create(website);
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function updateWebsite(id, newWebsite) {
        return Website.update(
            {_id: id},
            {
                $set: {
                    name: newWebsite.name,
                    description: newWebsite.description,
                    pages: newWebsite.pages
                }
            }
        );
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
})();