const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperSituationRolesSchema = require('../../../schemas/HelpersituationRolesSchema');

module.exports = {
    customId: 'singlerole_button',
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
            const singleRole = data.singleRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Remove other situation roles
            const rolesToRemove = [data.takenRole, data.mariedRole, data.heartlessRole].filter(Boolean);
            await member.roles.remove(rolesToRemove);

            // Check if the user has the Single role
            if (singleRole && member.roles.cache.has(singleRole)) {
                await member.roles.remove(singleRole);
                embed.setDescription(`<:singleemojie:1187813884908814387> <@${interaction.user.id}>: <@&${singleRole}> role removed successfully!`);
            } else {
                if (singleRole) await member.roles.add(singleRole);
                embed.setDescription(`<:singleemojie:1187813884908814387> <@${interaction.user.id}>: <@&${singleRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling singlerole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
