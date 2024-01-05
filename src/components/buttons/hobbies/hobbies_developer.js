const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'developerrole_button',
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
            const developerRole = data.developerRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Developer role
            if (developerRole && member.roles.cache.has(developerRole)) {
                // Remove the Developer role
                await member.roles.remove(developerRole);
                embed.setDescription(`<a:developer:1188264283813974117> <@${interaction.user.id}>: <@&${developerRole}> role removed successfully!`);
            } else {
                // Give the user the Developer role
                if (developerRole) await member.roles.add(developerRole);
                embed.setDescription(`<a:developer:1188264283813974117> <@${interaction.user.id}>: <@&${developerRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling developerrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
