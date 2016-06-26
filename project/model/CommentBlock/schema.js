module.exports = (function() {
    var mongoose = require("mongoose");

    var CBSchema = mongoose.Schema({
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        root: {type: mongoose.Schema.Types.ObjectId, unique: true},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.cb"});
    
    return CBSchema;
})();