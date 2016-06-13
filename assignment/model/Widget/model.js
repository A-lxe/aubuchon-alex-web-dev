module.exports = (function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./schema.js");
    var Widget = mongoose.model("Widget", WidgetSchema);
    var Page = mongoose.model("Page", require('../Page/schema.js'));

    var api = {
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;

        return Widget.create(widget).then(
            function (widget) {
                Page.findById(pageId).then(
                    function (page) {
                        page.widgets.push(widget._id);
                        console.log(JSON.stringify(page.widgets));
                        Page.update(
                            {_id: pageId},
                            {
                                $set: {
                                    widgets: page.widgets
                                }
                            }
                        ).exec();
                    },
                    function (error) {

                    }
                )
                return widget;
            },
            function (error) {
                return error;
            }
        );
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function findAllWidgetsForPage(pageId) {
        return new Promise(
            function (resolve, reject) {
                Page.findById(pageId).then(
                    function (response) {
                        var promiseArray = [];
                        for (i in response.widgets) {
                            promiseArray.push(Widget.findById(response.widgets[i]).then(
                                function (widget) {
                                    console.log(response.widgets[i] + ":" + JSON.stringify(widget));
                                    return widget;
                                },
                                function (error) {

                                }
                            ));
                        }
                        return Promise.all(promiseArray).then(
                            function (widgetList) {
                                resolve(widgetList);
                            },
                            function (error) {
                                reject(error);
                            }
                        );
                    },
                    function (error) {
                        reject(error);
                    }
                );
            });
    }

    function updateWidget(id, newWidget) {
        return Widget.update(
            {_id: id},
            {
                $set: {
                    name: newWidget.name,
                    text: newWidget.text,
                    placeholder: newWidget.placeholder,
                    description: newWidget.description,
                    url: newWidget.url,
                    width: newWidget.width,
                    height: newWidget.height,
                    rows: newWidget.rows,
                    size: newWidget.size,
                    class: newWidget.class,
                    icon: newWidget.icon,
                    upload: newWidget.upload,
                    formatted: newWidget.formatted,
                    title: newWidget.title
                }
            }
        );
    }

    function deleteWidget(widgetId) {
        return new Promise(
            function (resolve, reject) {
                Widget.findById(widgetId).then(
                    function (widget) {
                        if (widget.deletable) {
                            Promise.all([
                                Widget.remove({_id: widgetId}),
                                removeWidgetFromPage(widget._page, widgetId)]).then(
                                function (response) {
                                    resolve(response);
                                },
                                function (error) {
                                    reject(error);
                                }
                            )
                        } else {
                            reject('Widget is not deletable');
                        }
                    },
                    function (error) {
                        reject(error);
                    }
                )
            }
        )
    }

    function removeWidgetFromPage(pageId, widgetId) {
        return Page.findById(pageId).then(
            function (response) {
                for (var i in response.widgets) {
                    if (response.widgets[i] == widgetId) {
                        response.widgets.splice(i, 1);
                    }
                }
                Page.update(
                    {_id: pageId},
                    {
                        $set: {
                            widgets: response.widgets
                        }
                    }).then(
                    function (response) {
                        resolve(response);
                    },
                    function (error) {
                        reject(response);

                    }
                );
            },
            function (error) {
                reject(error);
            }
        );
    }

    function reorderWidget(pageId, start, end) {
        return Page.findById(pageId).then(
            function (response) {
                var widget = response.widgets[start];
                response.widgets.splice(start,1);
                response.widgets.splice(end,0,widget);
                Page.update(
                    {_id: pageId},
                    {
                        $set: {
                            widgets: response.widgets
                        }
                    }).then(
                    function (response) {
                        resolve(response);
                    },
                    function (error) {
                        reject(response);

                    }
                );
            },
            function (error) {
                reject(error);
            }
        );
    }
})();