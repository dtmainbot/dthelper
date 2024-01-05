const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'pubgrole_button',
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
            const pubgRole = data.pubgRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the PUBG role
            if (pubgRole && member.roles.cache.has(pubgRole)) {
                // Remove the PUBG role
                await member.roles.remove(pubgRole);
                embed.setDescription(`<:pubgemojie:1187859796884463818> <@${interaction.user.id}>: <@&${pubgRole}> role removed successfully!`);
            } else {
                // Give the user the PUBG role
                if (pubgRole) await member.roles.add(pubgRole);
                embed.setDescription(`<:pubgemojie:1187859796884463818> <@${interaction.user.id}>: <@&${pubgRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling pubgrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
