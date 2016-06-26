module.exports = (function () {

    var mongoose = require("mongoose");
    var BotSchema = require("./schema.js");
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
        return Bot.find(
            {$text: {$search: searchString}},
            {score: {$meta: "textScore"}}
        )
            .sort({score: {$meta: 'textScore'}});
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