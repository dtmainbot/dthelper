const { SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperSituationRolesSchema = require('../../../schemas/HelpersituationRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_situation_roles')
        .setDescription('Set up The Situation self role Roles.')
        .addRoleOption(option => option
            .setName('single_role')
            .setDescription('Select the single role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('taken_role')
            .setDescription('Select the Taken role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('maried_role')
            .setDescription('Select the Maried role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('heartless_role')
            .setDescription('Select the HeartLess role.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        // Get the selected roles from interaction options
        const singleRole = interaction.options.getRole('single_role').id;
        const takenRole = interaction.options.getRole('taken_role').id;
        const mariedRole = interaction.options.getRole('maried_role').id;
        const heartlessRole = interaction.options.getRole('heartless_role').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperSituationRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    singleRole: singleRole,
                    takenRole: takenRole,
                    mariedRole: mariedRole,
                    heartlessRole: heartlessRole,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Situation roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }

    }
};