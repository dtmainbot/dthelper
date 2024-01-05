const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    customId: 'chessrole_button',
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
            const chessRole = data.chessRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Chess role
            if (chessRole && member.roles.cache.has(chessRole)) {
                // Remove the Chess role
                await member.roles.remove(chessRole);
                embed.setDescription(`<:chessemojie:1188139895533875242> <@${interaction.user.id}>: <@&${chessRole}> role removed successfully!`);
            } else {
                // Give the user the Chess role
                if (chessRole) await member.roles.add(chessRole);
                embed.setDescription(`<:chessemojie:1188139895533875242> <@${interaction.user.id}>: <@&${chessRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling chessrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
