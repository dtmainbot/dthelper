const { SlashCommandBuilder, ChannelType } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperTasksManagerSchema = require('../../../schemas/HelperTasksManagerSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_tasks_manager')
        .setDescription('Set up The tasks System.')
        .addNumberOption(option => option
            .setName('tasks_cooldown')
            .setDescription('Set the Cooldown between tasks (must be between 10 and 120 minute).')
            .setRequired(true)
            .setMinValue(10)
            .setMaxValue(120)
        )
        .addChannelOption(option => option
            .setName('tasks_logs_channel')
            .setDescription('Select the channel where tasks will be sent.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addNumberOption(option => option
            .setName('xp_per_user')
            .setDescription('set the xp per user for the tasking system.')
            .setRequired(true)
            .setMinValue(20)
            .setMaxValue(500)
        ),

        options: {
            permissions: `Administrator`
        },
        
    run: async (client, interaction) => {
        const guildId = interaction.guild.id;
        const tasks_cooldown = interaction.options.getNumber('tasks_cooldown');
        const tasks_logs_channel = interaction.options.getChannel('tasks_logs_channel').id;
        const xp_per_user = interaction.options.getNumber('xp_per_user');


        // Save data to MongoDB
        try {

            await HelperTasksManagerSchema.findOneAndUpdate(
                { guildid: guildId },
                {
                    guildid: guildId,
                    tasksCooldown: tasks_cooldown,
                    Xp_Per_User: xp_per_user,
                    tasksLogs: tasks_logs_channel,
                },
                { upsert: true, new: true }
            );

            return interaction.reply('- Tasks System have been set up successfully!');
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            return interaction.reply('An error occurred while saving data to the database.');
        }
    }
};
