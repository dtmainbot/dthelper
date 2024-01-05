const { SlashCommandBuilder } = require('discord.js');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_mini_games_roles')
        .setDescription('Set up The Mini Games self role Roles.')
        .addRoleOption(option => option
            .setName('amongus_role')
            .setDescription('Select the Among Us role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('parkour_role')
            .setDescription('Select the Parkour role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('codenames_role')
            .setDescription('Select the Codenames role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('chess_role')
            .setDescription('Select the Chess role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('parchisi_role')
            .setDescription('Select the Parchisi role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('garticphone_role')
            .setDescription('Select the Gartic Phone role.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        await interaction.deferReply();

        // Get the selected roles from interaction options
        const amongus_role = interaction.options.getRole('amongus_role').id;
        const parkour_role = interaction.options.getRole('parkour_role').id;
        const codenames_role = interaction.options.getRole('codenames_role').id;
        const chess_role = interaction.options.getRole('chess_role').id;
        const parchisi_role = interaction.options.getRole('parchisi_role').id;
        const garticphone_role = interaction.options.getRole('garticphone_role').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperMiniGamesRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    amongusRole: amongus_role,
                    parkourRole: parkour_role,
                    codenamesRole: codenames_role,
                    chessRole: chess_role,
                    parchisiRole: parchisi_role,
                    garticphoneRole: garticphone_role,
                },
                { upsert: true, new: true }
            );

            // Send the reply after data is successfully saved
            await interaction.editReply('- Mini Games roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            // Send an error message if there is an issue with saving data
            await interaction.editReply('An error occurred while saving data to the database.');
        }
    }
};
