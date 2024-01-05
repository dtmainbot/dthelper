const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperSituationRolesSchema = require('../../../schemas/HelpersituationRolesSchema');

module.exports = {
    customId: 'heartlessrole_button',
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
            const heartlessRole = data.heartlessRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Remove other situation roles
            const rolesToRemove = [data.singleRole, data.takenRole, data.mariedRole].filter(Boolean);
            await member.roles.remove(rolesToRemove);

            // Check if the user has the Heartless role
            if (heartlessRole && member.roles.cache.has(heartlessRole)) {
                await member.roles.remove(heartlessRole);
                embed.setDescription(`<a:heartlessemojie:1187814364548444292> <@${interaction.user.id}>: <@&${heartlessRole}> role removed successfully!`);
            } else {
                if (heartlessRole) await member.roles.add(heartlessRole);
                embed.setDescription(`<a:heartlessemojie:1187814364548444292> <@${interaction.user.id}>: <@&${heartlessRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling heartlessrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
