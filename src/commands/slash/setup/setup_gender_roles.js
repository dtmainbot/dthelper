const { SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperGenderRolesSchema = require('../../../schemas/HelperGenderRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_gender_roles')
        .setDescription('Set up The Gender self role Roles.')
        .addRoleOption(option => option
            .setName('he_him_role')
            .setDescription('Select the He/Him role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('she_her_role')
            .setDescription('Select the She/Her role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('they_them_role')
            .setDescription('Select the They/Them role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('any_pronoun_role')
            .setDescription('Select the Any Pronoun role.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        // Get the selected roles from interaction options
        const he_himRole = interaction.options.getRole('he_him_role').id;
        const she_herRole = interaction.options.getRole('she_her_role').id;
        const they_themRole = interaction.options.getRole('they_them_role').id;
        const any_pronounRole = interaction.options.getRole('any_pronoun_role').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperGenderRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    he_himRole: he_himRole,
                    she_herRole: she_herRole,
                    they_themRole: they_themRole,
                    any_pronounRole: any_pronounRole,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Gender roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }

    }
};