const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'toxicrole_button',
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
            const toxicRole = data.toxicRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Toxic role
            if (toxicRole && member.roles.cache.has(toxicRole)) {
                // Remove the Toxic role
                await member.roles.remove(toxicRole);
                embed.setDescription(`<a:toxicemojie:1187827200574103694> <@${interaction.user.id}>: <@&${toxicRole}> role removed successfully!`);
            } else {
                // Give the user the Toxic role
                if (toxicRole) await member.roles.add(toxicRole);
                embed.setDescription(`<a:toxicemojie:1187827200574103694> <@${interaction.user.id}>: <@&${toxicRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling toxicrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
