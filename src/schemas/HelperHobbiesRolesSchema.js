const { model, Schema } = require('mongoose');

module.exports = model('HelperHobbiesRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        gamerRole: {
            type: String
        },
        dancerRole: {
            type: String
        },
        singerRole: {
            type: String
        },
        artistRole: {
            type: String
        },
        otakuRole: {
            type: String
        },
        developerRole: {
            type: String
        },
        content_creatorRole: {
            type: String
        },
        photographerRole: {
            type: String
        },
        shefRole: {
            type: String
        },
    })
);