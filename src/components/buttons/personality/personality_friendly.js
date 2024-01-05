const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'friendlyrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperPersonalityRolesSchema.findOne({ guildid: guildId });
            const friendlyRole = data.friendlyRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Friendly role
            if (friendlyRole && member.roles.cache.has(friendlyRole)) {
                // Remove the Friendly role
                await member.roles.remove(friendlyRole);
                embed.setDescription(`<a:friendlyemojie:1187826517267464242> <@${interaction.user.id}>: <@&${friendlyRole}> role removed successfully!`);
            } else {
                // Give the user the Friendly role
                if (friendlyRole) await member.roles.add(friendlyRole);
                embed.setDescription(`<a:friendlyemojie:1187826517267464242> <@${interaction.user.id}>: <@&${friendlyRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling friendlyrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
