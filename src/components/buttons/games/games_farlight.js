const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'farlightrole_button',
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
            const farlightRole = data.farlightRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Farlight role
            if (farlightRole && member.roles.cache.has(farlightRole)) {
                // Remove the Farlight role
                await member.roles.remove(farlightRole);
                embed.setDescription(`<:farlightemojie:1187859719554080839> <@${interaction.user.id}>: <@&${farlightRole}> role removed successfully!`);
            } else {
                // Give the user the Farlight role
                if (farlightRole) await member.roles.add(farlightRole);
                embed.setDescription(`<:farlightemojie:1187859719554080839> <@${interaction.user.id}>: <@&${farlightRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling farlightrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
