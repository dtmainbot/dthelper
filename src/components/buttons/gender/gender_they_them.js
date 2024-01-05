const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGenderRolesSchema = require('../../../schemas/HelperGenderRolesSchema');

module.exports = {
    customId: 'they_themrole_button',
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
            const data = await HelperGenderRolesSchema.findOne({ guildid: guildId });
            const he_himRole = data.he_himRole;
            const she_herRole = data.she_herRole;
            const they_themRole = data.they_themRole;
            const any_pronounRole = data.any_pronounRole;

            // Create an ephemeral embed
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription('Processing your request...');

            // Check if the user has the They/Them role
            if (they_themRole && member.roles.cache.has(they_themRole)) {
                // Remove the They/Them role and other gender roles
                await member.roles.remove([they_themRole, he_himRole, she_herRole, any_pronounRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<a:lgbtqemojie:1187744249400274954> <@${interaction.user.id}>: <@&${they_themRole}> role removed successfully!`);
            } else {
                // Give the user the They/Them role
                if (they_themRole) await member.roles.add(they_themRole);

                // Remove other gender roles
                await member.roles.remove([he_himRole, she_herRole, any_pronounRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<a:lgbtqemojie:1187744249400274954> <@${interaction.user.id}>: <@&${they_themRole}> role added successfully!`);
            }

            // Send the embed as an ephemeral message
            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling they_themrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
