const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'csgorole_button',
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
            const csgoRole = data.csgoRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the CS:GO role
            if (csgoRole && member.roles.cache.has(csgoRole)) {
                // Remove the CS:GO role
                await member.roles.remove(csgoRole);
                embed.setDescription(`<:csgo:1187859999586799667> <@${interaction.user.id}>: <@&${csgoRole}> role removed successfully!`);
            } else {
                // Give the user the CS:GO role
                if (csgoRole) await member.roles.add(csgoRole);
                embed.setDescription(`<:csgo:1187859999586799667> <@${interaction.user.id}>: <@&${csgoRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling csgorole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
