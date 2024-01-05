const { model, Schema } = require('mongoose');

module.exports = model('HelperGamesRolesSchema',
    new Schema({
        guildid: {
            type: String,
            required: true
        },
        freefireRole: {
            type: String
        },
        pubgRole: {
            type: String
        },
        valorantRole: {
            type: String
        },
        fortniteRole: {
            type: String
        },
        farlightRole: {
            type: String
        },
        csgoRole: {
            type: String
        },
        gtaRole: {
            type: String
        },
        minecraftRole: {
            type: String
        },
        callofduttyRole: {
            type: String
        },
        leagueoflegendsRole: {
            type: String
        },
        brawlhallaRole: {
            type: String
        },
        efootballRole: {
            type: String
        },
        rustRole: {
            type: String
        },
    })
);