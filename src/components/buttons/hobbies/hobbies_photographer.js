// photographerrole_button.js
const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'photographerrole_button',
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
            const photographerRole = data.photographerRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Photographer role
            if (photographerRole && member.roles.cache.has(photographerRole)) {
                // Remove the Photographer role
                await member.roles.remove(photographerRole);
                embed.setDescription(`<:photographer:1188264442153160744> <@${interaction.user.id}>: <@&${photographerRole}> role removed successfully!`);
            } else {
                // Give the user the Photographer role
                if (photographerRole) await member.roles.add(photographerRole);
                embed.setDescription(`<:photographer:1188264442153160744> <@${interaction.user.id}>: <@&${photographerRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling photographerrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
