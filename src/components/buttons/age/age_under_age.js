const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperAgeRolesSchema = require('../../../schemas/HelperAgeRolesSchema');

module.exports = {
    customId: 'under_agerole_button',
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

            // Check if the user has the Under Age role
            if (under_ageRole && member.roles.cache.has(under_ageRole)) {
                // Remove the Under Age role and other age roles
                await member.roles.remove([adultRole, under_ageRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<a:underageemojie:1187745383556841512> <@${interaction.user.id}>: <@&${under_ageRole}> role removed successfully!`);
            } else {
                // Give the user the Under Age role
                if (under_ageRole) await member.roles.add(under_ageRole);

                // Remove other age roles
                if (adultRole) await member.roles.remove(adultRole);

                // Update the embed with a mention
                embed.setDescription(`<a:underageemojie:1187745383556841512> <@${interaction.user.id}>: <@&${under_ageRole}> role added successfully!`);
            }

            // Send the embed as an ephemeral message
            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling under_agerole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
