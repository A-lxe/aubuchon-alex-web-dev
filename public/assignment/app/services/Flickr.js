(function () {
    function Flickr($http) {

        var key = "19a628f082f78c89a8b1687b518a10f1";
        var secret = "2aac2438ccc7358d";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        return {
            searchPhotos: searchPhotos
        }
    }

    angular.module('App')
        .factory('Flickr', ['$http', Flickr])
})();