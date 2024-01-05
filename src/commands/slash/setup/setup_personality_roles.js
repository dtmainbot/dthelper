const { SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_personality_roles')
        .setDescription('Set up The Personality self role Roles.')
        .addRoleOption(option => option
            .setName('friendly_role')
            .setDescription('Select the friendly role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('social_role')
            .setDescription('Select the social role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('anti_social_role')
            .setDescription('Select the anti social role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('toxic_role')
            .setDescription('Select the toxic role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('kind_role')
            .setDescription('Select the kind role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('optimistic_role')
            .setDescription('Select the optimistic role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('funny_role')
            .setDescription('Select the funny role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('introvert_role')
            .setDescription('Select the introvert role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('weird_role')
            .setDescription('Select the weird role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('honest_role')
            .setDescription('Select the honest role.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },
        
    run: async (client, interaction) => {
        // Get the selected roles from interaction options
        const friendly_role = interaction.options.getRole('friendly_role').id;
        const social_role = interaction.options.getRole('social_role').id;
        const anti_social_role = interaction.options.getRole('anti_social_role').id;
        const toxic_role = interaction.options.getRole('toxic_role').id;
        const kind_role = interaction.options.getRole('kind_role').id;
        const optimistic_role = interaction.options.getRole('optimistic_role').id;
        const funny_role = interaction.options.getRole('funny_role').id;
        const introvert_role = interaction.options.getRole('introvert_role').id;
        const weird_role = interaction.options.getRole('weird_role').id;
        const honest_role = interaction.options.getRole('honest_role').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperPersonalityRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    friendlyRole: friendly_role,
                    socialRole: social_role,
                    anti_socialRole: anti_social_role,
                    toxicRole: toxic_role,
                    kindRole: kind_role,
                    optimisticRole: optimistic_role,
                    funnyRole: funny_role,
                    introvertRole: introvert_role,
                    weirdRole: weird_role,
                    honestRole: honest_role,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Personality roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }

    }
};