const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'lolrole_button',
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
            const leagueoflegendsRole = data.leagueoflegendsRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the League of Legends role
            if (leagueoflegendsRole && member.roles.cache.has(leagueoflegendsRole)) {
                // Remove the League of Legends role
                await member.roles.remove(leagueoflegendsRole);
                embed.setDescription(`<:lolemojie:1187861778491781170> <@${interaction.user.id}>: <@&${leagueoflegendsRole}> role removed successfully!`);
            } else {
                // Give the user the League of Legends role
                if (leagueoflegendsRole) await member.roles.add(leagueoflegendsRole);
                embed.setDescription(`<:lolemojie:1187861778491781170> <@${interaction.user.id}>: <@&${leagueoflegendsRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling lolrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
