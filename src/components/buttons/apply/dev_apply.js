const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');
const HelperApplyQuestionsSchema = require('../../../schemas/HelperApplyQuestionsSchema');

module.exports = {
    customId: 'developerapply_button',
    
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
                    .setTitle('Developer Application')
                    .setCustomId('developer-modal')
                    .addComponents(
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 1')
                                    .setCustomId('developer_q1')
                                    .setPlaceholder(`${questions.developer_q1 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 2')
                                    .setCustomId('developer_q2')
                                    .setPlaceholder(`${questions.developer_q2 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 3')
                                    .setCustomId('developer_q3')
                                    .setPlaceholder(`${questions.developer_q3 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 4')
                                    .setCustomId('developer_q4')
                                    .setPlaceholder(`${questions.developer_q4 || `No question Provided`}`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Question 5')
                                    .setCustomId('developer_q5')
                                    .setPlaceholder(`${questions.developer_q5 || `No question Provided`}`)
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
