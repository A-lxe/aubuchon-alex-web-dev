(function () {
    function Bot($http, $rootScope) {

        return {
            create: create,
            findById: findById,
            findByDiscordId: findByDiscordId,
            findByUserId: findByUserId,
            findBest: findBest,
            searchBots: searchBots,
            update: update,
            deleteBot: deleteBot
        }

        function create(bot) {
            return $http.post("/arcus/api/bot", bot);
        }

        function findById(botId) {
            return $http.get("/arcus/api/bot/" + botId);
        }

        function findByDiscordId(discId) {
            return $http.get("/arcus/api/bot/discord/" + discId);
        }

        function findByUserId(userId) {
            return $http.get("/arcus/api/bot/user/" + userId);
        }
        
        function findBest(startIndex, number, sortBy) {
            return $http.get("/arcus/api/bot/list/where?start=" + startIndex +"&number=" + number + "&sort=" + sortBy);
        }
        
        function searchBots(searchString) {
            return $http.get("/arcus/api/bot/search/where?search=" + searchString);
        }

        function update(bot) {
            return $http.patch("/arcus/api/bot", bot);
        }

        function deleteBot(botId) {
            return $http.delete("/arcus/api/bot/" + botId);
        }
    }

    angular.module('Arcus')
        .factory('Bot', ['$http', '$rootScope', Bot])
})();