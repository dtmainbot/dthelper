const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'fortniterole_button',
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
            const fortniteRole = data.fortniteRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Fortnite role
            if (fortniteRole && member.roles.cache.has(fortniteRole)) {
                // Remove the Fortnite role
                await member.roles.remove(fortniteRole);
                embed.setDescription(`<:fortniteemoji:1187859658497593474> <@${interaction.user.id}>: <@&${fortniteRole}> role removed successfully!`);
            } else {
                // Give the user the Fortnite role
                if (fortniteRole) await member.roles.add(fortniteRole);
                embed.setDescription(`<:fortniteemoji:1187859658497593474> <@${interaction.user.id}>: <@&${fortniteRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling fortniterole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
