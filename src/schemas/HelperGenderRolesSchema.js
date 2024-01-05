const { model, Schema } = require('mongoose');

module.exports = model('HelperGenderRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        he_himRole: {
            type: String
        },
        she_herRole: {
            type: String
        },
        they_themRole: {
            type: String
        },
        any_pronounRole: {
            type: String
        },

    })
);