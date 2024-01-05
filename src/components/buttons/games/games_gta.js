const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'gtarole_button',
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
            const gtaRole = data.gtaRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the GTA role
            if (gtaRole && member.roles.cache.has(gtaRole)) {
                // Remove the GTA role
                await member.roles.remove(gtaRole);
                embed.setDescription(`<:gtaemojie:1187860449740455968> <@${interaction.user.id}>: <@&${gtaRole}> role removed successfully!`);
            } else {
                // Give the user the GTA role
                if (gtaRole) await member.roles.add(gtaRole);
                embed.setDescription(`<:gtaemojie:1187860449740455968> <@${interaction.user.id}>: <@&${gtaRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling gtarole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
