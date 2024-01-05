const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'gamerrole_button',
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
            const gamerRole = data.gamerRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Gamer role
            if (gamerRole && member.roles.cache.has(gamerRole)) {
                // Remove the Gamer role
                await member.roles.remove(gamerRole);
                embed.setDescription(`<a:gameremojie:1188263669625257995> <@${interaction.user.id}>: <@&${gamerRole}> role removed successfully!`);
            } else {
                // Give the user the Gamer role
                if (gamerRole) await member.roles.add(gamerRole);
                embed.setDescription(`<a:gameremojie:1188263669625257995> <@${interaction.user.id}>: <@&${gamerRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling gamerrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
