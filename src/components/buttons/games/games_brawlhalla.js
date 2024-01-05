const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    customId: 'brawlhallarole_button',
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
            const brawlhallaRole = data.brawlhallaRole;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Brawlhalla role
            if (brawlhallaRole && member.roles.cache.has(brawlhallaRole)) {
                // Remove the Brawlhalla role
                await member.roles.remove(brawlhallaRole);
                embed.setDescription(`<:brawlhalla:1187860576534270022> <@${interaction.user.id}>: <@&${brawlhallaRole}> role removed successfully!`);
            } else {
                // Give the user the Brawlhalla role
                if (brawlhallaRole) await member.roles.add(brawlhallaRole);
                embed.setDescription(`<:brawlhalla:1187860576534270022> <@${interaction.user.id}>: <@&${brawlhallaRole}> role added successfully!`);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling brawlhallarole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
