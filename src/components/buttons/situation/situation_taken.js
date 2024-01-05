const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperSituationRolesSchema = require('../../../schemas/HelpersituationRolesSchema');

module.exports = {
    customId: 'takenrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperSituationRolesSchema.findOne({ guildid: guildId });
            const takenRole = data.takenRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Remove other situation roles
            const rolesToRemove = [data.singleRole, data.mariedRole, data.heartlessRole].filter(Boolean);
            await member.roles.remove(rolesToRemove);

            // Check if the user has the Taken role
            if (takenRole && member.roles.cache.has(takenRole)) {
                await member.roles.remove(takenRole);
                embed.setDescription(`<a:takenemojie:1187814113859088496> <@${interaction.user.id}>: <@&${takenRole}> role removed successfully!`);
            } else {
                if (takenRole) await member.roles.add(takenRole);
                embed.setDescription(`<a:takenemojie:1187814113859088496> <@${interaction.user.id}>: <@&${takenRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling takenrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
