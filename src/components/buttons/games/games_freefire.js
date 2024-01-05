const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'freerole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperGamesRolesSchema.findOne({ guildid: guildId });
            const freefireRole = data.freefireRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Free Fire role
            if (freefireRole && member.roles.cache.has(freefireRole)) {
                // Remove the Free Fire role
                await member.roles.remove(freefireRole);
                embed.setDescription(`<:freefireemojie:1187859465253421066> <@${interaction.user.id}>: <@&${freefireRole}> role removed successfully!`);
            } else {
                // Give the user the Free Fire role
                if (freefireRole) await member.roles.add(freefireRole);
                embed.setDescription(`<:freefireemojie:1187859465253421066> <@${interaction.user.id}>: <@&${freefireRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling freerole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
