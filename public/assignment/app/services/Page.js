(function() {
    function Page() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        function createPage(websiteId, page) {
            if(pageWithName(websiteId, page.name)) {
                return false;
            }
            var newPage = angular.copy(page);
            newPage.websiteId = websiteId;
            newPage._id = newId();
            pages.push(newPage);
            return newPage;
        }

        function newId() {
            var temp = 0;
            for(var i in pages) {
                temp = Math.max(pages[i]._id, temp);
            }
            return temp + 1;
        }

        function findPagesByWebsiteId(websiteId) {
            var p = []
            for(var i in pages) {
                if(pages[i].websiteId == websiteId) {
                    p.push(angular.copy(pages[i]));
                }
            }
            return p;
        }

        function findPageById(pageId) {
            for(var i in pages) {
                if(pages[i]._id == pageId) {
                    return angular.copy(pages[i]);
                }
            }
        }

        function updatePage(pageId, page) {
            for(var i in pages) {
                if(pages[i]._id == pageId) {
                    pages[i].name = page.name;
                    pages[i].description = page.description;
                    return angular.copy(pages[i]);
                }
            }
        }

        function deletePage(pageId) {
            for(var i in pages) {
                if(pages[i]._id == pageId) {
                    pages.splice(i,1);
                }
            }
        }

        function pageWithName(websiteId, name) {
            for(var i in pages) {
                if(pages[i].websiteId == websiteId && pages[i].name == name) {
                    return true;
                }
            }
            return false;
        }

        return {
            createPage: createPage,
            findPageByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            pageWithName: pageWithName
        }
    }

    angular.module('App')
        .factory('Page', Page)
})();