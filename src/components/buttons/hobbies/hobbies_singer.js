const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'singerrole_button',
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
            const singerRole = data.singerRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Singer role
            if (singerRole && member.roles.cache.has(singerRole)) {
                // Remove the Singer role
                await member.roles.remove(singerRole);
                embed.setDescription(`<:singeremojie:1188263967248896030> <@${interaction.user.id}>: <@&${singerRole}> role removed successfully!`);
            } else {
                // Give the user the Singer role
                if (singerRole) await member.roles.add(singerRole);
                embed.setDescription(`<:singeremojie:1188263967248896030> <@${interaction.user.id}>: <@&${singerRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling singerrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
