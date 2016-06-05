module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload', upload.single('image'), uploadImage);


    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req, res) {
        var newWidget = req.body
        var pageId = req.params.pageId;
        newWidget._id = newId();
        newWidget.pageId = pageId;
        newWidget.widgetType = newWidget.widgetType || "";
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var out = [];
        for (i in widgets) {
            if (widgets[i].pageId == pageId) {
                out.push(widgets[i]);
            }
        }
        res.json(out);
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;
        for (i in widgets) {
            if (widgets[i]._id == id) {
                res.json(widgets[i]);
                return;
            }
        }
        res.status(404).json({error: "Widget with ID: " + id + " not found."});
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var widget = req.body;
        for (i in widgets) {
            if (widgets[i]._id == id) {
                var old = widgets[i];
                widgets[i] = widget;
                widgets[i]._id = id;
                res.json(widgets[i]);
                return;
            }
        }
        res.status(404).json({error: "Widget with ID: " + id + " not found."});
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        for (i in widgets) {
            if (widgets[i]._id == id) {
                widgets.splice(i, 1);
                res.end()
                return;
            }
        }
        res.status(404).json({error: "Widget with ID: " + id + " not found."});
    }

    function uploadImage(req, res) {
        var image        = req.file;

        var originalname  = image.originalname; // file name on user's computer
        var filename      = image.filename;     // new file name in upload folder
        var path          = image.path;         // full path of uploaded file
        var destination   = image.destination;  // folder where file is saved to
        var size          = image.size;
        var mimetype      = image.mimetype;

        res.json({
            path: './uploads/' + filename
        })
    }
    
    function removeImage(req, res) {
        var fileName = req.body.fileName;
        
    }

    function newId() {
        var temp = 0;
        for (i in widgets) {
            temp = Math.max(widgets[i]._id, temp);
        }
        return temp + 1;
    }
}
