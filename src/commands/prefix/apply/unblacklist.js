const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');

module.exports = {
    structure: {
        name: 'unblacklist',
        description: 'Unblacklist Someone from Apply!',
        aliases: ['apply-unblacklist'],
        cooldown: 8000,
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        // Check if the user has the "Manage Roles" permission or the "Manager" role
        if (!message.member.permissions.has('ManageRoles') && !message.member.roles.cache.some(role => role.name === 'Manager')) {
            return message.reply({ content: '- You do not have the required permissions to use this command.', ephemeral: true, flags: [4096] });
        }

        let id;

        if (message.mentions.users.first()) {
            id = message.mentions.users.first().id;
        } else {
            id = args[0];
        }

        try {
            const guildId = message.guild.id;

            // Find the document for the current guild
            const helperApplyDocument = await HelperApplySchema.findOne({ guildid: guildId });

            // Check if the user is blacklisted
            const isBlacklisted = helperApplyDocument.blacklistedIds.some(entry => entry.userId === id);

            if (isBlacklisted) {
                // If blacklisted, remove the user from the blacklist array
                helperApplyDocument.blacklistedIds = helperApplyDocument.blacklistedIds.filter(entry => entry.userId !== id);

                // Save the updated document to the database
                await helperApplyDocument.save();

                message.reply({
                    embeds: [
                        new EmbedBuilder().setColor(`Random`).setDescription(`✅ Done Unblacklisting <@${id}> ..`)
                    ],
                    flags: [4096]
                });
            } else {
                message.reply({
                    embeds: [
                        new EmbedBuilder().setColor(`Random`).setDescription(`❗ <@${id}> is not blacklisted.`)
                    ],
                    flags: [4096]
                });
            }
        } catch (error) {
            console.error('Error updating blacklist:', error);
            message.reply('An error occurred while updating the blacklist.');
        }
    },
};
