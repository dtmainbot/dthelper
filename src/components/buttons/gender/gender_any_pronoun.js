const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperGenderRolesSchema = require('../../../schemas/HelperGenderRolesSchema');

module.exports = {
    customId: 'any_pronounrole_button',
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

            // Check if the user has the Any Pronoun role
            if (any_pronounRole && member.roles.cache.has(any_pronounRole)) {
                // Remove the Any Pronoun role and other gender roles
                await member.roles.remove([any_pronounRole, he_himRole, she_herRole, they_themRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<:qmarkemojie:1187744275052630167> <@${interaction.user.id}>: <@&${any_pronounRole}> role removed successfully!`);
            } else {
                // Give the user the Any Pronoun role
                if (any_pronounRole) await member.roles.add(any_pronounRole);

                // Remove other gender roles
                await member.roles.remove([he_himRole, she_herRole, they_themRole].filter(Boolean));

                // Update the embed with a mention
                embed.setDescription(`<:qmarkemojie:1187744275052630167> <@${interaction.user.id}>: <@&${any_pronounRole}> role added successfully!`);
            }

            // Send the embed as an ephemeral message
            await interaction.reply({ embeds: [embed], ephemeral: true, flags: [4096] });
        } catch (error) {
            console.error('Error handling any_pronounrole_button click:', error);
            return interaction.reply('An error occurred while processing the button click.');
        }
    },
};
