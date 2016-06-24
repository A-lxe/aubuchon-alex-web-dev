module.exports = (function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./schema.js");
    var User = mongoose.model("User", UserSchema);

    var api = {
        create: create,
        findById: findById,
        findByUserId: findByUserId,
        findBest: findBest,
        search: search,
        update: update,
        deleteBot: deleteBot
    };
    return api;

    function findByDiscordId(discordId) {
        return User.findOne({'discord.id': discordId});
    }

    function create(user) {
        if(!user.username) {
            user.username = "`" + user.discord.username + "#" + user.discord.discriminator + Date.now();
        }
        return User.create(user);
    }

    function findById(userId) {
        return User.findById(userId);
    }

    function findByUsername(username) {
        return User.findOne({username: username});
    }

    function update(userId, newUser) {
        return User.update(
            {_id: userId},
            {
                $set: {
                    firstName: newUser.firstName || '',
                    lastName: newUser.lastName || '',
                    email: newUser.email || ''
                }
            }
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
})();