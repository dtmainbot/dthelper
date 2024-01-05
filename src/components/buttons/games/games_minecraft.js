const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'minecraftrole_button',
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
            const minecraftRole = data.minecraftRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Minecraft role
            if (minecraftRole && member.roles.cache.has(minecraftRole)) {
                // Remove the Minecraft role
                await member.roles.remove(minecraftRole);
                embed.setDescription(`<a:minecraftemojie:1187860303829008456> <@${interaction.user.id}>: <@&${minecraftRole}> role removed successfully!`);
            } else {
                // Give the user the Minecraft role
                if (minecraftRole) await member.roles.add(minecraftRole);
                embed.setDescription(`<a:minecraftemojie:1187860303829008456> <@${interaction.user.id}>: <@&${minecraftRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling minecraftrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
