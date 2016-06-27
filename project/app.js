module.exports = function(app) {
    var models = require("./model/model.js");
    require("./services/User.js")(app, models);
    require("./services/Bot.js")(app, models);
    require("./services/CommentBlock.js")(app, models);
};