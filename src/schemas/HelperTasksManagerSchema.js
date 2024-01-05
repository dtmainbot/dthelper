const { model, Schema } = require('mongoose');

module.exports = model('HelperTasksManagerSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        xpPerUser: {
            type: String
        },
        tasksCooldown: {
            type: String
        },
        tasksLogs: {
            type: String
        },
    })
);