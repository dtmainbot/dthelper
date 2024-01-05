const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    customId: 'parkourrole_button',
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
            const parkourRole = data.parkourRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Parkour role
            if (parkourRole && member.roles.cache.has(parkourRole)) {
                // Remove the Parkour role
                await member.roles.remove(parkourRole);
                embed.setDescription(`<a:parcouremojie:1187861587583840326> <@${interaction.user.id}>: <@&${parkourRole}> role removed successfully!`);
            } else {
                // Give the user the Parkour role
                if (parkourRole) await member.roles.add(parkourRole);
                embed.setDescription(`<a:parcouremojie:1187861587583840326> <@${interaction.user.id}>: <@&${parkourRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling parkourrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
