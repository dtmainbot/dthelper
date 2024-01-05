const { SlashCommandBuilder, ChannelType } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperOfflineNotifySchema = require('../../../schemas/HelperOfflineNotifySchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_offline_notify')
        .setDescription('Set up The Offline Notify System.')
        .addChannelOption(option => option
            .setName('offline_notify_logs_channel')
            .setDescription('Select the channel where Offline Notify logs will be recorded.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        ),
        
        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {

        // Get the selected roles and channels from interaction options
        const offline_notify_logs_channel = interaction.options.getChannel('offline_notify_logs_channel').id;

        // Save data to MongoDB
        try {
            const guildId = interaction.guild.id;

            await HelperOfflineNotifySchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    offlineNotifyLogsChannel: offline_notify_logs_channel,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Offline Notify channel have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }
    }
};
