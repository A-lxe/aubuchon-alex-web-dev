(function() {
    function Website() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        function createWebsite(userId, website) {
            if(websiteWithName(userId, website.name)) {
                return false;
            }
            var newSite = angular.copy(website);
            newSite.developerId = userId;
            newSite._id = newId();
            websites.push(newSite);
            return newSite;
        }

        function newId() {
            var temp = 0;
            for(var i in websites) {
                temp = Math.max(websites[i]._id, temp);
            }
            return temp + 1;
        }

        function findWebsitesByUser(userId) {
            var sites = []
            for(var i in websites) {
                if(websites[i].developerId == userId) {
                    sites.push(angular.copy(websites[i]));
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites) {
                if(websites[i]._id == websiteId) {
                    return angular.copy(websites[i]);
                }
            }
        }

        function updateWebsite(websiteId, website) {
            for(var i in websites) {
                if(websites[i]._id == websiteId) {
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if(websites[i]._id == websiteId) {
                    websites.splice(i,1);
                }
            }
        }

        function websiteWithName(userId, name) {
            for(var i in websites) {
                if(websites[i].developerId == userId && websites[i].name == name) {
                    return true;
                }
            }
            return false;
        }

        return {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            websiteWithName: websiteWithName
        }
    }

    angular.module('App')
        .factory('Website', Website)
})();