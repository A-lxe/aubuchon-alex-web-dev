module.exports = function (app, models) {

    var passport = require('passport');
    var Bot = models.botModel;

    var scopes = ['identify', 'email'];
    var discordConfig = {
        clientID: process.env.DISCORD_CLIENT_ID || "194693171354140672",
        clientSecret: process.env.DISCORD_CLIENT_SECRET || "7iBOp_4jCHnfJGq5iOaNzfMjFGoaug5N",
        callbackURL: process.env.DISCORD_CALLBACK_URL || "http://127.0.0.1:3000/arcus/auth/discord/callback",
        scope: scopes
    };

    app.post('/arcus/api/bot', checkAuthenticated, create);
    app.get('/arcus/api/bot/:botId', findById);
    app.get('/arcus/api/bot/discord/:botId', findByDiscordId);
    app.get('/arcus/api/bot/user/:userId', findByUserId);
    app.get('/arcus/api/bot/list/where', findBest);
    app.get('/arcus/api/bot/search/where', searchBot);
    app.patch('/arcus/api/bot', checkAuthenticated, update);
    app.delete('/arcus/api/bot/:botId', checkAuthenticated, deleteBot);

    function checkAuthenticated(req, res, next) {
        if(req.isAuthenticated() && req.user) {
            next();
        } else {
            res.status(401);
        }
    }

    function create(req, res) {
        var newBot = req.body;
        newBot.owner = req.user._id;
        Bot.create(newBot).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(500);
                res.json(error);
            }
        )
    }

    function findById(req, res) {
        var id = req.params.botId;

        Bot.findById(id).then(
            function (response) {
                if (response) {
                    res.json(response);
                } else {
                    res.status(404).json({error: "Bot with ID: " + id + " not found."});
                }
            },
            function (error) {
                res.status(404).json({error: error});
            }
        )
    }

    function findByDiscordId(req, res) {
        Bot.findByDiscordId(req.params.discordId).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404);
                res.json(error);
            }
        );
    }

    function findByUserId(req, res) {
        Bot.findByUserId(req.params.userId).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(404);
                res.json(error);
            }
        );
    }

    function findBest(req, res) {
        var start = req.query.start;
        var number = req.query.number;
        var sort = JSON.parse(req.query.sort);
        
        Bot.findBest(sort, start, number).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                console.log(JSON.stringify(error));
                res.status(500);
                res.json(error);
            }
        )
    }

    function searchBot(req, res) {
        var searchString = req.query.search;

        Bot.searchBot(searchString).then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(500);
                res.json(error);
            }
        )
    }
    
    function update(req, res) {
        var bot = req.body;
        var id = bot._id;

        Bot.update(id, bot).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "Bot with ID: " + id + " not found."});
            }
        )
    }

    function deleteBot(req, res) {
        var id = req.params.botId;

        Bot.deleteBot(id).then(
            function (response) {
                res.json(response);
            },
            function (error) {
                res.status(404).json({error: "Bot with ID: " + id + " not found."});
            }
        )
    }
};
