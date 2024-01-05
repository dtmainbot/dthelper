const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'socialrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperPersonalityRolesSchema.findOne({ guildid: guildId });
            const socialRole = data.socialRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Social role
            if (socialRole && member.roles.cache.has(socialRole)) {
                // Remove the Social role
                await member.roles.remove(socialRole);
                embed.setDescription(`<:socialemojie:1187826848281936024> <@${interaction.user.id}>: <@&${socialRole}> role removed successfully!`);
            } else {
                // Give the user the Social role
                if (socialRole) await member.roles.add(socialRole);
                embed.setDescription(`<:socialemojie:1187826848281936024> <@${interaction.user.id}>: <@&${socialRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling socialrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
