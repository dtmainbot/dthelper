const { model, Schema } = require('mongoose');

module.exports = model('HelperApplyQuestionSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        mod_q1: {
            type: String
        },
        mod_q2: {
            type: String
        },
        mod_q3: {
            type: String
        },
        mod_q4: {
            type: String
        },
        mod_q5: {
            type: String
        },
        developer_q1: {
            type: String
        },
        developer_q2: {
            type: String
        },
        developer_q3: {
            type: String
        },
        developer_q4: {
            type: String
        },
        developer_q5: {
            type: String
        },
        designer_q1: {
            type: String
        },
        designer_q2: {
            type: String
        },
        designer_q3: {
            type: String
        },
        designer_q4: {
            type: String
        },
        designer_q5: {
            type: String
        },
        event_hoster_q1: {
            type: String
        },
        event_hoster_q2: {
            type: String
        },
        event_hoster_q3: {
            type: String
        },
        event_hoster_q4: {
            type: String
        },
        event_hoster_q5: {
            type: String
        },
    })
);
