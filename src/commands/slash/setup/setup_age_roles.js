const { SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperAgeRolesSchema = require('../../../schemas/HelperAgeRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_age_roles')
        .setDescription('Set up The Age self role Roles.')
        .addRoleOption(option => option
            .setName('adult_role')
            .setDescription('Select the Adult role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('under_age_role')
            .setDescription('Select the Under Age role.')
            .setRequired(true)
        ),
        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        // Get the selected roles from interaction options
        const adult_Role = interaction.options.getRole('adult_role').id;
        const under_age_Role = interaction.options.getRole('under_age_role').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperAgeRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    adultRole: adult_Role,
                    under_ageRole: under_age_Role,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Age roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }

    }
};