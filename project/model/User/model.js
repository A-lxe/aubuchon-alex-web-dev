module.exports = (function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./schema.js");
    var User = mongoose.model("User", UserSchema);

    var api = {
        findByDiscordId: findByDiscordId,
        create: create,
        findById: findById,
        update: update,
        deleteUser: deleteUser
    };
    return api;

    function findByDiscordId(discordId) {
        return User.findOne({'discord.id': discordId});
    }

    function create(user) {
        return User.create(user);
    }

    function findById(userId) {
        return User.findById(userId);
    }

    function update(userId, newUser) {
        return User.update(
            {_id: userId},
            {
                $set: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                }
            }
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
})();