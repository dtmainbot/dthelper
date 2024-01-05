const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'dancerrole_button',
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
            const dancerRole = data.dancerRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Dancer role
            if (dancerRole && member.roles.cache.has(dancerRole)) {
                // Remove the Dancer role
                await member.roles.remove(dancerRole);
                embed.setDescription(`<a:danceremojie:1188263771450388481> <@${interaction.user.id}>: <@&${dancerRole}> role removed successfully!`);
            } else {
                // Give the user the Dancer role
                if (dancerRole) await member.roles.add(dancerRole);
                embed.setDescription(`<a:danceremojie:1188263771450388481> <@${interaction.user.id}>: <@&${dancerRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling dancerrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
