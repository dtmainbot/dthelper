const { model, Schema } = require('mongoose');

module.exports = model('HelperSituationRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        singleRole: {
            type: String
        },
        takenRole: {
            type: String
        },
        mariedRole: {
            type: String
        },
        heartlessRole: {
            type: String
        },
    })
);