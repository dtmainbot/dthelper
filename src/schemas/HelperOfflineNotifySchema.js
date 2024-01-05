const { model, Schema } = require('mongoose');

module.exports = model('HelperOfflineNotifySchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        offlineNotifyLogsChannel: {
            type: String
        },
    })
);