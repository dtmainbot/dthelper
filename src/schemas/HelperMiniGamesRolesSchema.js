const { model, Schema } = require('mongoose');

module.exports = model('HelperMiniGamesRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        amongusRole: {
            type: String
        },
        parkourRole: {
            type: String
        },
        codenamesRole: {
            type: String
        },
        chessRole: {
            type: String
        },
        parchisiRole: {
            type: String
        },
        garticphoneRole: {
            type: String
        },
    })
);