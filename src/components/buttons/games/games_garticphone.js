const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    customId: 'garticphonerole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperMiniGamesRolesSchema.findOne({ guildid: guildId });
            const garticphoneRole = data.garticphoneRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Gartic Phone role
            if (garticphoneRole && member.roles.cache.has(garticphoneRole)) {
                // Remove the Gartic Phone role
                await member.roles.remove(garticphoneRole);
                embed.setDescription(`<:garticemojie:1188140197066580009> <@${interaction.user.id}>: <@&${garticphoneRole}> role removed successfully!`);
            } else {
                // Give the user the Gartic Phone role
                if (garticphoneRole) await member.roles.add(garticphoneRole);
                embed.setDescription(`<:garticemojie:1188140197066580009> <@${interaction.user.id}>: <@&${garticphoneRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling garticphonerole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
