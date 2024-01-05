const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'rustrole_button',
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
            const rustRole = data.rustRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Rust role
            if (rustRole && member.roles.cache.has(rustRole)) {
                // Remove the Rust role
                await member.roles.remove(rustRole);
                embed.setDescription(`<:rustemojie:1187874309402787901> <@${interaction.user.id}>: <@&${rustRole}> role removed successfully!`);
            } else {
                // Give the user the Rust role
                if (rustRole) await member.roles.add(rustRole);
                embed.setDescription(`<:rustemojie:1187874309402787901> <@${interaction.user.id}>: <@&${rustRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling rustrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
