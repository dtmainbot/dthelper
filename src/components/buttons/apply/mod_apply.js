const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');
const HelperApplyQuestionsSchema = require('../../../schemas/HelperApplyQuestionsSchema');

module.exports = {
    customId: 'modapply_button',
    
    run: async (client, interaction) => {
        const userId = interaction.user.id;
        const questions = await HelperApplyQuestionsSchema.findOne({ guildid: interaction.guild.id })

        try {
            const { blacklistedIds } = await HelperApplySchema.findOne({ guildid: interaction.guild.id });

            const isBlacklisted = blacklistedIds.some(entry => entry.userId === userId);

            if (isBlacklisted) {

             interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(`Random`)
                    .setDescription(`<:blacklistemojie:1188491646338347138> <@${interaction.user.id}>: You are Blacklisted, You can\`t Apply!`)
                ],
                ephemeral: true,
                flags: [4096]
            });

            } else {
                const modal = new ModalBuilder()
                    .setTitle('Moderator Application')
                    .setCustomId('moderator-modal')
                    .addComponents(
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 1')
                                    .setCustomId('moderator_q1')
                                    .setPlaceholder(`${questions.mod_q1 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 2')
                                    .setCustomId('moderator_q2')
                                    .setPlaceholder(`${questions.mod_q2 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 3')
                                    .setCustomId('moderator_q3')
                                    .setPlaceholder(`${questions.mod_q3 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 4')
                                    .setCustomId('moderator_q4')
                                    .setPlaceholder(`${questions.mod_q4 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 5')
                                    .setCustomId('moderator_q5')
                                    .setPlaceholder(`${questions.mod_q5 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                    );


                await interaction.showModal(modal);
            }
        } catch (error) {
            console.error('Error fetching blacklistedIds:', error);
            interaction.reply({ content: 'An error occurred. Please try again later.', ephemeral: true });
        }
    },
};
