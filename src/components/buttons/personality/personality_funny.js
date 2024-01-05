const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    customId: 'funnyrole_button',
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
            const funnyRole = data.funnyRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Funny role
            if (funnyRole && member.roles.cache.has(funnyRole)) {
                // Remove the Funny role
                await member.roles.remove(funnyRole);
                embed.setDescription(`<a:funnyemojie:1187828384739364975> <@${interaction.user.id}>: <@&${funnyRole}> role removed successfully!`);
            } else {
                // Give the user the Funny role
                if (funnyRole) await member.roles.add(funnyRole);
                embed.setDescription(`<a:funnyemojie:1187828384739364975> <@${interaction.user.id}>: <@&${funnyRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling funnyrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
