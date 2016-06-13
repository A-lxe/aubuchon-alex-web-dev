module.exports = function (app, models) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload', upload.single('image'), uploadImage);
    app.put('/api/page/:pageId/widget', reorderWidget);
    
    
    var Widget = models.widgetModel;

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        Widget.createWidget(pageId, newWidget).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(400).json({error: error});
            }
        )
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params.pageId;

        Widget.findAllWidgetsForPage(id).then(
            function (response) {
                if (response) {
                    console.log("Output: " + JSON.stringify(response));
                    res.json(response);
                } else {
                    console.log("Output: " + JSON.stringify(response));
                    res.status(404).json({error: error});
                }
            },
            function (error) {
                console.log(JSON.stringify(error));
                res.status(404).json({error: error});
            }
        )
    }

    function findWidgetById(req, res) {
        var id = req.params.widgetId;

        Widget.findWidgetById(id).then(
            function (response) {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Widget with ID: " + id + " not found."});
                }
            },
            function (error) {
                res.status(404).json({error: error});
            }
        )
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var widget = req.body;

        Widget.updateWidget(id, widget).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "Widget with ID: " + id + " not found."});
            }
        )
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;

        Widget.deleteWidget(id).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "Widget with ID: " + id + " not found."});
            }
        )
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
    
    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;
        
        Widget.reorderWidget(pageId, start, end).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "Widget with ID: " + id + " not found."});
            }
        );
    }
}
