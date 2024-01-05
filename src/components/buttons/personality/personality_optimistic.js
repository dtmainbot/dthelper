const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'optimisticrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            const member = await interaction.member.fetch();
            const guildId = interaction.guild.id;
            const data = await HelperPersonalityRolesSchema.findOne({ guildid: guildId });
            const optimisticRole = data.optimisticRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Optimistic role
            if (optimisticRole && member.roles.cache.has(optimisticRole)) {
                // Remove the Optimistic role
                await member.roles.remove(optimisticRole);
                embed.setDescription(`<:optimisticemojie:1187827784152797306> <@${interaction.user.id}>: <@&${optimisticRole}> role removed successfully!`);
            } else {
                // Give the user the Optimistic role
                if (optimisticRole) await member.roles.add(optimisticRole);
                embed.setDescription(`<:optimisticemojie:1187827784152797306> <@${interaction.user.id}>: <@&${optimisticRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling optimisticrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
