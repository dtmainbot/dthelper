const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    customId: 'offlinenotify_button',
    
    run: async (client, interaction) => {
                const modal = new ModalBuilder()
                    .setTitle('Offline Notify')
                    .setCustomId('offline-notify-modal')
                    .addComponents(
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Time')
                                    .setCustomId('offline_time')
                                    .setPlaceholder(`Please let us know how long you will be offline`)
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('Reason')
                                    .setCustomId('offline_reason')
                                    .setPlaceholder(`Please tell us why you won't be online`)
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setRequired(true)
                            ),
                            new ActionRowBuilder()
                            .addComponents(
                                new TextInputBuilder()
                                    .setLabel('return time')
                                    .setCustomId('return_time')
                                    .setPlaceholder(`Please let us know your estimated return time`)
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(true)
                            ),
                    );


                await interaction.showModal(modal);
            }
};
