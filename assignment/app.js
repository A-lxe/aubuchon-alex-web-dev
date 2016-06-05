module.exports = function(app) {
    require("./services/User.js")(app);
    require("./services/Website.js")(app);
    require("./services/Page.js")(app);
    require("./services/Widget.js")(app);
};