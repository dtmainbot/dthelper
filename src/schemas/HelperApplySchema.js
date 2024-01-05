const { model, Schema } = require('mongoose');

module.exports = model('HelperApplySchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        modRole: {
            type: String
        },
        developerRole: {
            type: String
        },
        designerRole: {
            type: String
        },
        eventhosterRole: {
            type: String
        },
        managerRole: {
            type: String
        },
        finichedapplyChannel: {
            type: String
        },
        applylogsChannel: {
            type: String
        },
        blacklistedIds: [
            {
                userId: {
                    type: String,
                    required: true
                },
            },
        ],
    })
);
