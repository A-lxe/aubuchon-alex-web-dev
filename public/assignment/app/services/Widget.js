(function() {
    function Widget() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function createWidget(pageId, widget) {
            var newWidget = angular.copy(widget);
            newWidget.pageId = pageId;
            newWidget._id = newId();
            widgets.push(newWidget);
            return newWidget;
        }

        function newId() {
            var temp = 0;
            for(var i in widgets) {
                temp = Math.max(widgets[i]._id, temp);
            }
            return temp + 1;
        }

        function findWidgetsByPageId(pageId) {
            var p = []
            for(var i in widgets) {
                if(widgets[i].pageId == pageId) {
                    p.push(angular.copy(widgets[i]));
                }
            }
            return p;
        }

        function findWidgetById(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    return angular.copy(widgets[i]);
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    widgets[i] = angular.copy(widget);
                    return angular.copy(widgets[i]);
                }
            }
        }

        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    widgets.splice(i,1);
                }
            }
        }
        
        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        }
    }

    angular.module('App')
        .factory('Widget', Widget)
})();