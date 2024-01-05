const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperCasinoselfRolesSchema = require('../../../schemas/HelperCasinoselfRolesSchema');

module.exports = {
    customId: 'casinorole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperCasinoselfRolesSchema.findOne({ guildid: guildId });
            const casinoRole = data.casinoRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Casino role
            if (casinoRole && member.roles.cache.has(casinoRole)) {
                // Remove the Casino role
                await member.roles.remove(casinoRole);
                embed.setDescription(`<a:casinoemojie:1188178840158208081> <@${interaction.user.id}>: <@&${casinoRole}> role removed successfully!`);
            } else {
                // Give the user the Casino role
                if (casinoRole) await member.roles.add(casinoRole);
                embed.setDescription(`<a:casinoemojie:1188178840158208081> <@${interaction.user.id}>: <@&${casinoRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling casinorole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
