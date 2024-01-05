const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'codrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperGamesRolesSchema.findOne({ guildid: guildId });
            const callofdutyRole = data.callofdutyRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Call of Duty role
            if (callofdutyRole && member.roles.cache.has(callofdutyRole)) {
                // Remove the Call of Duty role
                await member.roles.remove(callofdutyRole);
                embed.setDescription(`<:codemojie:1187860207737512157> <@${interaction.user.id}>: <@&${callofdutyRole}> role removed successfully!`);
            } else {
                // Give the user the Call of Duty role
                if (callofdutyRole) await member.roles.add(callofdutyRole);
                embed.setDescription(`<:codemojie:1187860207737512157> <@${interaction.user.id}>: <@&${callofdutyRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling codrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
