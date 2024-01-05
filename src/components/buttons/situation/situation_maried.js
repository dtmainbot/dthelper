const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperSituationRolesSchema = require('../../../schemas/HelpersituationRolesSchema');

module.exports = {
    customId: 'marriedrole_button',
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
            const marriedRole = data.mariedRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Remove other situation roles
            const rolesToRemove = [data.singleRole, data.takenRole, data.heartlessRole].filter(Boolean);
            await member.roles.remove(rolesToRemove);

            // Check if the user has the Married role
            if (marriedRole && member.roles.cache.has(marriedRole)) {
                await member.roles.remove(marriedRole);
                embed.setDescription(`<:mariedemojie:1187814248701755404> <@${interaction.user.id}>: <@&${marriedRole}> role removed successfully!`);
            } else {
                if (marriedRole) await member.roles.add(marriedRole);
                embed.setDescription(`<:mariedemojie:1187814248701755404> <@${interaction.user.id}>: <@&${marriedRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling marriedrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
