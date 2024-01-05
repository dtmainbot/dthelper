const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'shefrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperHobbiesRolesSchema.findOne({ guildid: guildId });
            const shefRole = data.shefRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Shef role
            if (shefRole && member.roles.cache.has(shefRole)) {
                // Remove the Shef role
                await member.roles.remove(shefRole);
                embed.setDescription(`<:shefemojie:1188265135920386058> <@${interaction.user.id}>: <@&${shefRole}> role removed successfully!`);
            } else {
                // Give the user the Shef role
                if (shefRole) await member.roles.add(shefRole);
                embed.setDescription(`<:shefemojie:1188265135920386058> <@${interaction.user.id}>: <@&${shefRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling shefrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
