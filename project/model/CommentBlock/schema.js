module.exports = (function() {
    var mongoose = require("mongoose");

    var CBSchema = mongoose.Schema({
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        root: {type: mongoose.Schema.Types.ObjectId, unique: true},
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.commentblock"});
    
    var CommentSchema = mongoose.Schema({
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        content: String,
    }, {collection: "project.comment"});
    
    return {CBSchema: CBSchema, CommentSchema: CommentSchema};
})();