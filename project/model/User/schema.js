module.exports = (function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        discord: {
            id: String,
            username: String,
            discriminator: String,
            email: String,
            avatar: String
        },
        email: String,
        phone: String,
        bots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bot' }],
        comments: {type: mongoose.Schema.Types.ObjectId, ref: 'CommentBlock'},
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "project.user"});

    return UserSchema;
})();