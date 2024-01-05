const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'artistrole_button',
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
            const artistRole = data.artistRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Artist role
            if (artistRole && member.roles.cache.has(artistRole)) {
                // Remove the Artist role
                await member.roles.remove(artistRole);
                embed.setDescription(`<:artist:1188264041571958785> <@${interaction.user.id}>: <@&${artistRole}> role removed successfully!`);
            } else {
                // Give the user the Artist role
                if (artistRole) await member.roles.add(artistRole);
                embed.setDescription(`<:artist:1188264041571958785> <@${interaction.user.id}>: <@&${artistRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling artistrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
