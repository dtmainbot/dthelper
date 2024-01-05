const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    customId: 'codenamesrole_button',
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
            const codenamesRole = data.codenamesRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Codenames role
            if (codenamesRole && member.roles.cache.has(codenamesRole)) {
                // Remove the Codenames role
                await member.roles.remove(codenamesRole);
                embed.setDescription(`<:codemanesemojie:1187861230212370444> <@${interaction.user.id}>: <@&${codenamesRole}> role removed successfully!`);
            } else {
                // Give the user the Codenames role
                if (codenamesRole) await member.roles.add(codenamesRole);
                embed.setDescription(`<:codemanesemojie:1187861230212370444> <@${interaction.user.id}>: <@&${codenamesRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling codenamesrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
