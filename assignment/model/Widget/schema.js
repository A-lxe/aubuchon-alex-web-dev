module.exports = (function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        type: String,
        name : {type: String, default: ''},
        text : {type: String, default: ''},
        placeholder: {type: String, default: ''},
        description: {type: String, default: ''},
        url: {type: String, default: ''},
        width : {type: String, default: ''},
        height : {type: String, default: ''},
        rows : {type: Number, default: 0},
        size : {type: Number, default: 0},
        class : {type: String, default: ''},
        icon : {type: String, default: ''},
        upload: {type: Boolean, default: false},
        deletable : {type: Boolean, default: true},
        formatted : {type: Boolean, default: false},
        title : {type: String, default: ''},
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.widget"});

return WidgetSchema;
})();