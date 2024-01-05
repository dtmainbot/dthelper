const { model, Schema } = require('mongoose');

module.exports = model('HelperCasinoselfRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        casinoRole: {
            type: String
        },
        prefix: {
            type: String
        },
    })
);