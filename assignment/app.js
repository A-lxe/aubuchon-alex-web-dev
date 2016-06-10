module.exports = function(app) {
    var models = require("./model/model.js");
    require("./services/User.js")(app, models);
    require("./services/Website.js")(app);
    require("./services/Page.js")(app);
    require("./services/Widget.js")(app);
};