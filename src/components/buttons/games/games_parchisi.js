const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    customId: 'parchisirole_button',
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
            const parchisiRole = data.parchisiRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Parchisi role
            if (parchisiRole && member.roles.cache.has(parchisiRole)) {
                // Remove the Parchisi role
                await member.roles.remove(parchisiRole);
                embed.setDescription(`<:parchisiemojie:1188140025414692915> <@${interaction.user.id}>: <@&${parchisiRole}> role removed successfully!`);
            } else {
                // Give the user the Parchisi role
                if (parchisiRole) await member.roles.add(parchisiRole);
                embed.setDescription(`<:parchisiemojie:1188140025414692915> <@${interaction.user.id}>: <@&${parchisiRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling parchisirole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
