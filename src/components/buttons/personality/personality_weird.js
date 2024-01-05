const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'weirdrole_button',
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
            const weirdRole = data.weirdRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Weird role
            if (weirdRole && member.roles.cache.has(weirdRole)) {
                // Remove the Weird role
                await member.roles.remove(weirdRole);
                embed.setDescription(`<:weirdemojie:1187828656203108544> <@${interaction.user.id}>: <@&${weirdRole}> role removed successfully!`);
            } else {
                // Give the user the Weird role
                if (weirdRole) await member.roles.add(weirdRole);
                embed.setDescription(`<:weirdemojie:1187828656203108544> <@${interaction.user.id}>: <@&${weirdRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling weirdrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
