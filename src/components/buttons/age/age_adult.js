const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperAgeRolesSchema = require('../../../schemas/HelperAgeRolesSchema');

module.exports = {
    customId: 'adultrole_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            // Fetch the member object
            const member = await interaction.member.fetch();

            // Get the guild ID
            const guildId = interaction.guild.id;

            // Retrieve role IDs from the database
            const data = await HelperAgeRolesSchema.findOne({ guildid: guildId });
            const adultRole = data.adultRole;
            const under_ageRole = data.under_ageRole;

            // Create an ephemeral embed
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the Adult role
            if (adultRole && member.roles.cache.has(adultRole)) {
                // Remove the Adult role and other age roles
                await member.roles.remove([adultRole, under_ageRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<a:adultemojie:1187801342715101286> <@${interaction.user.id}>: <@&${adultRole}> role removed successfully!`);
            } else {
                // Give the user the Adult role
                if (adultRole) await member.roles.add(adultRole);

                // Remove other age roles
                if (under_ageRole) await member.roles.remove(under_ageRole);

                // Update the embed with a mention
                embed.setDescription(`<a:adultemojie:1187801342715101286> <@${interaction.user.id}>: <@&${adultRole}> role added successfully!`);
            }

            // Send the embed as an ephemeral message
            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling adultrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
