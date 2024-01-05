const { model, Schema } = require('mongoose');

module.exports = model('HelperPersonalityRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        friendlyRole: {
            type: String
        },
        socialRole: {
            type: String
        },
        anti_socialRole: {
            type: String
        },
        toxicRole: {
            type: String
        },
        kindRole: {
            type: String
        },
        optimisticRole: {
            type: String
        },
        funnyRole: {
            type: String
        },
        introvertRole: {
            type: String
        },
        weirdRole: {
            type: String
        },
        honestRole: {
            type: String
        },
    })
);