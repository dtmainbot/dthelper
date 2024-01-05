const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    customId: 'hobbiesclearrole_button',
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

            // Check if data is available
            if (!data) {
                return interaction.reply('No role data found. Make sure roles are set up.');
            }

            // Collect all valid role IDs from data
            const roleIds = Object.values(data.toObject())
                .filter(roleId => roleId && interaction.guild.roles.cache.has(roleId));

            // Check if the user has more than one role before attempting to remove all roles
            if (member.roles.cache.size > 1 && roleIds.length > 0) {
                // Remove all roles from the user
                await member.roles.remove(roleIds);
            }

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription(`<a:clearemojie:1188137273271799909> <@${interaction.user.id}>: All hobbies roles removed successfully!`);

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling hobbiesclearrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
