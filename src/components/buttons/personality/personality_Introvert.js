const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'introvertrole_button',
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
            const introvertRole = data.introvertRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Introvert role
            if (introvertRole && member.roles.cache.has(introvertRole)) {
                // Remove the Introvert role
                await member.roles.remove(introvertRole);
                embed.setDescription(`<:Introvertemojie:1187828026361262150> <@${interaction.user.id}>: <@&${introvertRole}> role removed successfully!`);
            } else {
                // Give the user the Introvert role
                if (introvertRole) await member.roles.add(introvertRole);
                embed.setDescription(`<:Introvertemojie:1187828026361262150> <@${interaction.user.id}>: <@&${introvertRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling introvertrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
