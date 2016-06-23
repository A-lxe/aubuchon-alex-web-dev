module.exports = (function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./schema.js");
    var User = mongoose.model("User", UserSchema);

    var api = {
        findByDiscordId: findByDiscordId,
        create: create,
        findById: findById,
        findByUsername: findByUsername,
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

    function findByUsername(username) {
        return User.findOne({username: username});
    }

    function update(userId, newUser) {
        console.log(JSON.stringify(newUser));
        console.log(newUser.firstName);
        console.log(userId);
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