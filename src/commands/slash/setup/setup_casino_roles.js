const { SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperCasinoRolesSchema = require('../../../schemas/HelperCasinoselfRolesSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_casino_role')
        .setDescription('Set up The Casino self role Roles.')
        .addRoleOption(option => option
            .setName('casino_role')
            .setDescription('Select the Casino role.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('casino_prefix')
            .setDescription('Select the Casino bot Prefix.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        const adult_Role = interaction.options.getRole('casino_role').id;
        const casino_prefix = interaction.options.getString('casino_prefix');

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperCasinoRolesSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    casinoRole: adult_Role,
                    prefix: casino_prefix,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Casino roles have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }

    }
};