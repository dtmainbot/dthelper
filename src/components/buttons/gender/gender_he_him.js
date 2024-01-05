const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGenderRolesSchema = require('../../../schemas/HelperGenderRolesSchema');

module.exports = {
    customId: 'he_himrole_button',
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

            // Check if the user has the He/Him role
            if (he_himRole && member.roles.cache.has(he_himRole)) {
                // Remove the He/Him role and other gender roles
                await member.roles.remove([he_himRole, she_herRole, they_themRole, any_pronounRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<:maleemojie:1187744213769666571> <@${interaction.user.id}>: <@&${he_himRole}> role removed successfully!`);
            } else {
                // Give the user the He/Him role
                if (he_himRole) await member.roles.add(he_himRole);

                // Remove other gender roles
                await member.roles.remove([she_herRole, they_themRole, any_pronounRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<:maleemojie:1187744213769666571> <@${interaction.user.id}>: <@&${he_himRole}> role added successfully!`);
            }

            // Send the embed as an ephemeral message
            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling he_himrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
