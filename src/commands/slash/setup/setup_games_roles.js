const { SlashCommandBuilder } = require('discord.js');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_game_roles')
        .setDescription('Set up The Game self role Roles.')
        .addRoleOption(option => option
            .setName('freefire_role')
            .setDescription('Select the Free Fire role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('pubg_role')
            .setDescription('Select the PUBG role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('valorant_role')
            .setDescription('Select the Valorant role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('fortnite_role')
            .setDescription('Select the Fortnite role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('farlight_role')
            .setDescription('Select the Farlight role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('csgo_role')
            .setDescription('Select the CS:GO role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('gta_role')
            .setDescription('Select the GTA role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('minecraft_role')
            .setDescription('Select the Minecraft role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('callofduty_role')
            .setDescription('Select the Call of Duty role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('leagueoflegends_role')
            .setDescription('Select the League of Legends role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('brawlhalla_role')
            .setDescription('Select the Brawlhalla role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('efootball_role')
            .setDescription('Select the E-football role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('rust_role')
            .setDescription('Select the Rust role.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        // Get the selected roles from interaction options
        const freefire_role = interaction.options.getRole('freefire_role').id;
        const pubg_role = interaction.options.getRole('pubg_role').id;
        const valorant_role = interaction.options.getRole('valorant_role').id;
        const fortnite_role = interaction.options.getRole('fortnite_role').id;
        const farlight_role = interaction.options.getRole('farlight_role').id;
        const csgo_role = interaction.options.getRole('csgo_role').id;
        const gta_role = interaction.options.getRole('gta_role').id;
        const minecraft_role = interaction.options.getRole('minecraft_role').id;
        const callofduty_role = interaction.options.getRole('callofduty_role').id;
        const leagueoflegends_role = interaction.options.getRole('leagueoflegends_role').id;
        const brawlhalla_role = interaction.options.getRole('brawlhalla_role').id;
        const efootball_role = interaction.options.getRole('efootball_role').id;
        const rust_role = interaction.options.getRole('rust_role').id;



        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperGamesRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    freefireRole: freefire_role,
                    pubgRole: pubg_role,
                    valorantRole: valorant_role,
                    fortniteRole: fortnite_role,
                    farlightRole: farlight_role,
                    csgoRole: csgo_role,
                    gtaRole: gta_role,
                    minecraftRole: minecraft_role,
                    callofduttyRole: callofduty_role,
                    leagueoflegendsRole: leagueoflegends_role,
                    brawlhallaRole: brawlhalla_role,
                    efootballRole: efootball_role,
                    rustRole: rust_role,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Game roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }

    }
};
