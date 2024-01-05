const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'kindrole_button',
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
            const kindRole = data.kindRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Kind role
            if (kindRole && member.roles.cache.has(kindRole)) {
                // Remove the Kind role
                await member.roles.remove(kindRole);
                embed.setDescription(`<a:kindemojie:1187827466711081031> <@${interaction.user.id}>: <@&${kindRole}> role removed successfully!`);
            } else {
                // Give the user the Kind role
                if (kindRole) await member.roles.add(kindRole);
                embed.setDescription(`<a:kindemojie:1187827466711081031> <@${interaction.user.id}>: <@&${kindRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling kindrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
