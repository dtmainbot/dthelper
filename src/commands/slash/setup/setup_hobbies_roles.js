const { SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_hobbies_roles')
        .setDescription('Set up The Hobbies self role Roles.')
        .addRoleOption(option => option
            .setName('gamer_role')
            .setDescription('Select the Gamer role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('dancer_role')
            .setDescription('Select the Dancer role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('singer_role')
            .setDescription('Select the Singer role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('artist_role')
            .setDescription('Select the Artist role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('otaku_role')
            .setDescription('Select the Otaku role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('developer_role')
            .setDescription('Select the Developer role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('content_creator_role')
            .setDescription('Select the Content Creator role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('photographer_role')
            .setDescription('Select the Photographer role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('shef_role')
            .setDescription('Select the Shef role.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        // Get the selected roles from interaction options
        const gamer_role = interaction.options.getRole('gamer_role').id;
        const dancer_role = interaction.options.getRole('dancer_role').id;
        const singer_role = interaction.options.getRole('singer_role').id;
        const artist_role = interaction.options.getRole('artist_role').id;
        const otaku_role = interaction.options.getRole('otaku_role').id;
        const developer_role = interaction.options.getRole('developer_role').id;
        const content_creator_role = interaction.options.getRole('content_creator_role').id;
        const photographer_role = interaction.options.getRole('photographer_role').id;
        const shef_role = interaction.options.getRole('shef_role').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperHobbiesRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    gamerRole: gamer_role,
                    dancerRole: dancer_role,
                    singerRole: singer_role,
                    artistRole: artist_role,
                    otakuRole: otaku_role,
                    developerRole: developer_role,
                    content_creatorRole: content_creator_role,
                    photographerRole: photographer_role,
                    shefRole: shef_role,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Hobbies roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }

    }
};