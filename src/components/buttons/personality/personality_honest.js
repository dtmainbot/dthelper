const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'honestrole_button',
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
            const honestRole = data.honestRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Honest role
            if (honestRole && member.roles.cache.has(honestRole)) {
                // Remove the Honest role
                await member.roles.remove(honestRole);
                embed.setDescription(`<:honestemojie:1187828806254329926> <@${interaction.user.id}>: <@&${honestRole}> role removed successfully!`);
            } else {
                // Give the user the Honest role
                if (honestRole) await member.roles.add(honestRole);
                embed.setDescription(`<:honestemojie:1187828806254329926> <@${interaction.user.id}>: <@&${honestRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling honestrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
