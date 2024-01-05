const { model, Schema } = require('mongoose');

module.exports = model('HelperAgeRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        adultRole: {
            type: String
        },
        under_ageRole: {
            type: String
        },
    })
);