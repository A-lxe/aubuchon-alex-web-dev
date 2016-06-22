module.exports = function(app) {
    var models = require("./model/model.js");
    require("./services/User.js")(app, models);
};