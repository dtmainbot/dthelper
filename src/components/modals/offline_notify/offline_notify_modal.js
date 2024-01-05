const { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperOfflineNotifySchema = require('../../../schemas/HelperOfflineNotifySchema');


module.exports = {
    customId: 'offline-notify-modal',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const data = await HelperOfflineNotifySchema.findOne({ guildid: interaction.guild.id })

        const offlinenotifylogschannel = client.channels.cache.get(data.offlineNotifyLogsChannel);
        if (!offlinenotifylogschannel) {
            return console.error('Error: Offline Notify Logs channel is not defined.');
        }

        const Input_1 = interaction.fields.getTextInputValue('offline_time');
        const Input_2 = interaction.fields.getTextInputValue('offline_reason');
        const Input_3 = interaction.fields.getTextInputValue('return_time');

        const submitembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`<a:doneemoje:1188536782770409483> <@${interaction.user.id}>: Your Offline Notificaton Has been sent!`)

        const embeds = new EmbedBuilder()
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()})
        .setColor(`Random`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTitle(`<a:oflineemojie:1188865003630108672> **${interaction.user.username}\`s Offline Notificaton!**\n`)
        .setDescription(`
        \`q1\`: **Offline Time**
        <:arrownna:1188528432456421467> ${Input_1}

        \`q2\`: **Reason**
        <:arrownna:1188528432456421467> ${Input_2}
        
        \`q3\`: **Estimated return time**
        <:arrownna:1188528432456421467> ${Input_3}
        
        <a:attention:1188472331094474903> **Offline Notification Stats**
        <:arrowflipet:1188472519213207582>UserId:\`${interaction.user.id}\`
        <:arrowflipet:1188472519213207582>Username:\`${interaction.user.username}\`
        <:arrowflipet:1188472519213207582>User:<@${interaction.user.id}>\n
        `)
        .setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL()})
        .setTimestamp()  

        await interaction.reply({embeds: [submitembed], ephemeral: true, flags: [4096]});
        await offlinenotifylogschannel.send({embeds: [embeds]});

    }
};