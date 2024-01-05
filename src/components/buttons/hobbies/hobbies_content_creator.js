const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'content_creatorrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperHobbiesRolesSchema.findOne({ guildid: guildId });
            const contentCreatorRole = data.content_creatorRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Content Creator role
            if (contentCreatorRole && member.roles.cache.has(contentCreatorRole)) {
                // Remove the Content Creator role
                await member.roles.remove(contentCreatorRole);
                embed.setDescription(`<a:contentcreatoremojie:1188264380534620330> <@${interaction.user.id}>: <@&${contentCreatorRole}> role removed successfully!`);
            } else {
                // Give the user the Content Creator role
                if (contentCreatorRole) await member.roles.add(contentCreatorRole);
                embed.setDescription(`<a:contentcreatoremojie:1188264380534620330> <@${interaction.user.id}>: <@&${contentCreatorRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling content_creatorrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
