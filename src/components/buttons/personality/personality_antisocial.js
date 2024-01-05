const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'anti_socialrole_button',
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
            const antisocialRole = data.anti_socialRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Anti-Social role
            if (antisocialRole && member.roles.cache.has(antisocialRole)) {
                // Remove the Anti-Social role
                await member.roles.remove(antisocialRole);
                embed.setDescription(`<:antisocialemojie:1187827037117894828> <@${interaction.user.id}>: <@&${antisocialRole}> role removed successfully!`);
            } else {
                // Give the user the Anti-Social role
                if (antisocialRole) await member.roles.add(antisocialRole);
                embed.setDescription(`<:antisocialemojie:1187827037117894828> <@${interaction.user.id}>: <@&${antisocialRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling antisocialrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
