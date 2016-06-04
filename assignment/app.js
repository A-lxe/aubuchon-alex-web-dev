module.exports = function(app) {
    require("./services/User.js")(app);
    require("./services/Website.js")(app);
    //require("services/page.service.server.js")(app);
    //require("services/widget.service.server.js")(app);
};