const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'otakurole_button',
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
            const otakuRole = data.otakuRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Otaku role
            if (otakuRole && member.roles.cache.has(otakuRole)) {
                // Remove the Otaku role
                await member.roles.remove(otakuRole);
                embed.setDescription(`<a:otakuemojie:1188264178771836973> <@${interaction.user.id}>: <@&${otakuRole}> role removed successfully!`);
            } else {
                // Give the user the Otaku role
                if (otakuRole) await member.roles.add(otakuRole);
                embed.setDescription(`<a:otakuemojie:1188264178771836973> <@${interaction.user.id}>: <@&${otakuRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling otakurole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
