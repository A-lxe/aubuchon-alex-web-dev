module.exports = (function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        name : String,
        title : String,
        description : String,
        widgets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Widget' }],
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
})();