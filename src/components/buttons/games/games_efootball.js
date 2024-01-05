const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'efootballrole_button',
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
            const efootballRole = data.efootballRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the eFootball role
            if (efootballRole && member.roles.cache.has(efootballRole)) {
                // Remove the eFootball role
                await member.roles.remove(efootballRole);
                embed.setDescription(`<a:efootballemojie:1187870298587021412> <@${interaction.user.id}>: <@&${efootballRole}> role removed successfully!`);
            } else {
                // Give the user the eFootball role
                if (efootballRole) await member.roles.add(efootballRole);
                embed.setDescription(`<a:efootballemojie:1187870298587021412> <@${interaction.user.id}>: <@&${efootballRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling efootballrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
