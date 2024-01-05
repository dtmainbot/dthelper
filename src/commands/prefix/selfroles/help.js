const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Embed } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperAgeRolesSchema = require('../../../schemas/HelperAgeRolesSchema');

module.exports = {
    structure: {
        name: 'help-me',
        description: 'Get the Bot Help!',
        aliases: ['gethelp'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const embed = new EmbedBuilder()
        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL()})
        .setTitle(`The Bot Help`)
        


    }
};