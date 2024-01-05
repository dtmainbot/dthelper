const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    customId: 'amongusrole_button',
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
            const amongusRole = data.amongusRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Among Us role
            if (amongusRole && member.roles.cache.has(amongusRole)) {
                // Remove the Among Us role
                await member.roles.remove(amongusRole);
                embed.setDescription(`<:amongemojie:1187860723368464394> <@${interaction.user.id}>: <@&${amongusRole}> role removed successfully!`);
            } else {
                // Give the user the Among Us role
                if (amongusRole) await member.roles.add(amongusRole);
                embed.setDescription(`<:amongemojie:1187860723368464394> <@${interaction.user.id}>: <@&${amongusRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling amongusrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
