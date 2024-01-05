const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'valorantrole_button',
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
            const valorantRole = data.valorantRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Valorant role
            if (valorantRole && member.roles.cache.has(valorantRole)) {
                // Remove the Valorant role
                await member.roles.remove(valorantRole);
                embed.setDescription(`<:valorantemojie:1187859597676003518> <@${interaction.user.id}>: <@&${valorantRole}> role removed successfully!`);
            } else {
                // Give the user the Valorant role
                if (valorantRole) await member.roles.add(valorantRole);
                embed.setDescription(`<:valorantemojie:1187859597676003518> <@${interaction.user.id}>: <@&${valorantRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling valorantrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
