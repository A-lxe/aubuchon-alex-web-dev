module.exports = (function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./schema.js");
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForWebsite: findAllWidgetsForWebsite,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function findAllWidgetsForWebsite(pageId) {
        return Widget.find({_page: pageId});
    }

    function updateWidget(id, newWidget) {[]
        return Widget.update(
            {_id: id},
            {
                $set: {
                    name: newWidget.name,
                    title: newWidget.title,
                    description: newWidget.description,
                    widgets: newWidget.widgets
                }
            }
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
})();