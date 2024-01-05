const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');

module.exports = {
    structure: {
        name: 'blacklist',
        description: 'Blacklist Someone from Apply!',
        aliases: ['apply-blacklist'],
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

            // Check if the provided ID is a valid member in the guild
            const member = await message.guild.members.fetch(id);
            if (!member) {
                return message.reply({ content: '- ❌ Invalid member ID provided.', ephemeral: true, flags: [4096] });
            }

            // Find the document for the current guild
            const helperApplyDocument = await HelperApplySchema.findOne({ guildid: guildId });

            // Check if the user is already blacklisted
            const isBlacklisted = helperApplyDocument.blacklistedIds.some(entry => entry.userId === id);

            if (!isBlacklisted) {
                // If not blacklisted, add the user to the blacklist array
                helperApplyDocument.blacklistedIds.push({ userId: id });

                // Save the updated document to the database
                await helperApplyDocument.save();

                message.reply({
                    embeds: [
                        new EmbedBuilder().setColor(`Random`).setDescription(`✅ Done Blacklisting <@${id}> ..`)
                    ],
                    flags: [4096]
                });
            } else {
                message.reply({
                    embeds: [
                        new EmbedBuilder().setColor(`Random`).setDescription(`❗ <@${id}> is already blacklisted ..`)
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
