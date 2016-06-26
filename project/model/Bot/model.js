module.exports = (function () {

    var mongoose = require("mongoose");
    var textSearch = require("mongoose-text-search");
    var BotSchema = require("./schema.js");

    BotSchema.plugin(textSearch);
    BotSchema.index({name: 'text', subtitle: 'text', description: 'text'});

    var Bot = mongoose.model("Bot", BotSchema);

    var api = {
        create: create,
        findById: findById,
        findByUserId: findByUserId,
        findByDiscordId: findByDiscordId,
        findBest: findBest,
        searchBot: searchBot,
        update: update,
        deleteBot: deleteBot
    };
    return api;

    function findByDiscordId(discordId) {
        return Bot.findOne({'discord.id': discordId});
    }

    function create(bot) {
        var theBot = new Bot(bot);
        return theBot.save();
    }

    function findById(botId) {
        return Bot.findById(botId);
    }

    function findByUserId(botId) {
        return Bot.find({owner: botId});
    }

    function findBest(sortBy, startIndex, number) {
        return Bot.find({}).sort(sortBy).skip(parseInt(startIndex)).limit(parseInt(number));
    }

    function searchBot(searchString) {
        return new Promise(function (resolve, reject) {
            Bot.textSearch(searchString, function (err, response) {
                    if (err) {
                        console.log(JSON.stringify(err));
                        reject(err);
                    } else {
                        console.log(JSON.stringify(response));
                        var docArray = [];
                        for (var i in response.results) {
                            docArray.push(response.results[i].obj);
                        }
                        resolve(docArray);
                    }
                }
            );
        });
    }

    function update(botId, newBot) {
        return Bot.update(
            {_id: botId},
            {
                $set: {
                    name: newBot.name,
                    subtitle: newBot.subtitle,
                    description: newBot.description,
                    discord: newBot.discord
                }
            }
        );
    }

    function deleteBot(botId) {
        return Bot.remove({_id: botId});
    }
})();