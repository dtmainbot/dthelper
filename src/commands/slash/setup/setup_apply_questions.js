const { SlashCommandBuilder } = require('discord.js');
const HelperApplyQuestionsSchema = require('../../../schemas/HelperApplyQuestionsSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('setup_apply_questions')
        .setDescription('Set up The Helper Apply Questions.')
        .addStringOption(option => option
            .setName('mod_q1')
            .setDescription('Enter the moderator question 1.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('mod_q2')
            .setDescription('Enter the moderator question 2.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('mod_q3')
            .setDescription('Enter the moderator question 3.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('mod_q4')
            .setDescription('Enter the moderator question 4.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('mod_q5')
            .setDescription('Enter the moderator question 5.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('developer_q1')
            .setDescription('Enter the developer question 1.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('developer_q2')
            .setDescription('Enter the developer question 2.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('developer_q3')
            .setDescription('Enter the developer question 3.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('developer_q4')
            .setDescription('Enter the developer question 4.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('developer_q5')
            .setDescription('Enter the developer question 5.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('designer_q1')
            .setDescription('Enter the designer question 1.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('designer_q2')
            .setDescription('Enter the designer question 2.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('designer_q3')
            .setDescription('Enter the designer question 3.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('designer_q4')
            .setDescription('Enter the designer question 4.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('designer_q5')
            .setDescription('Enter the designer question 5.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('event_hoster_q1')
            .setDescription('Enter the event hoster question 1.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('event_hoster_q2')
            .setDescription('Enter the event hoster question 2.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('event_hoster_q3')
            .setDescription('Enter the event hoster question 3.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('event_hoster_q4')
            .setDescription('Enter the event hoster question 4.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('event_hoster_q5')
            .setDescription('Enter the event hoster question 5.')
            .setRequired(true)
        ),

        options: {
            permissions: `Administrator`
        },

    run: async (client, interaction) => {
        try {
            const guildId = interaction.guild.id;
            const options = interaction.options;

            // Create an object to store the questions
            const applyQuestions = {
                guildid: guildId,
                mod_q1: options.getString('mod_q1'),
                mod_q2: options.getString('mod_q2'),
                mod_q3: options.getString('mod_q3'),
                mod_q4: options.getString('mod_q4'),
                mod_q5: options.getString('mod_q5'),
                developer_q1: options.getString('developer_q1'),
                developer_q2: options.getString('developer_q2'),
                developer_q3: options.getString('developer_q3'),
                developer_q4: options.getString('developer_q4'),
                developer_q5: options.getString('developer_q5'),
                designer_q1: options.getString('designer_q1'),
                designer_q2: options.getString('designer_q2'),
                designer_q3: options.getString('designer_q3'),
                designer_q4: options.getString('designer_q4'),
                designer_q5: options.getString('designer_q5'),
                event_hoster_q1: options.getString('event_hoster_q1'),
                event_hoster_q2: options.getString('event_hoster_q2'),
                event_hoster_q3: options.getString('event_hoster_q3'),
                event_hoster_q4: options.getString('event_hoster_q4'),
                event_hoster_q5: options.getString('event_hoster_q5'),
            };

            // Save data to MongoDB
            await HelperApplyQuestionsSchema.findOneAndUpdate(
                { guildid: guildId },
                applyQuestions,
                { upsert: true, new: true }
            );

            return interaction.reply('- Apply questions have been set up successfully!');
        } catch (error) {
            console.error('Error saving apply questions to MongoDB:', error);
            return interaction.reply('An error occurred while saving apply questions to the database.');
        }
    }
};
