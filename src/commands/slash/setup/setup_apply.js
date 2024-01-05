const { SlashCommandBuilder, ChannelType } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_apply')
        .setDescription('Set up The Application System.')
        .addRoleOption(option => option
            .setName('moderator_role')
            .setDescription('Select the Moderator role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('developer_role')
            .setDescription('Select the Developer role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('designer_role')
            .setDescription('Select the Designer role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('event_hoster_role')
            .setDescription('Select the Event Hoster role.')
            .setRequired(true)
        )
        .addRoleOption(option => option
            .setName('manager_role')
            .setDescription('Select the Manager role.')
            .setRequired(true)
        )
        .addChannelOption(option => option
            .setName('finished_apply_channel')
            .setDescription('Select the channel where finished applications will be posted.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption(option => option
            .setName('apply_logs_channel')
            .setDescription('Select the channel where application logs will be recorded.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        ),

        options: {
            permissions: `Administrator`
        },
        
    run: async (client, interaction) => {
        // Get the selected roles and channels from interaction options
        const moderator_role = interaction.options.getRole('moderator_role').id;
        const developer_role = interaction.options.getRole('developer_role').id;
        const designer_role = interaction.options.getRole('designer_role').id;
        const event_hoster_role = interaction.options.getRole('event_hoster_role').id;
        const manager_role = interaction.options.getRole('manager_role').id;
        const finished_apply_channel = interaction.options.getChannel('finished_apply_channel').id;
        const apply_logs_channel = interaction.options.getChannel('apply_logs_channel').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperApplySchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    modRole: moderator_role,
                    developerRole: developer_role,
                    designerRole: designer_role,
                    eventhosterRole: event_hoster_role,
                    managerRole: manager_role,
                    finichedapplyChannel: finished_apply_channel,
                    applylogsChannel: apply_logs_channel,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Apply roles and channels have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }
    }
};
