const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperOfflineNotifySchema = require('../../../schemas/HelperOfflineNotifySchema');

module.exports = {
    structure: {
        name: 'offlinenotify-embed',
        description: 'Send The Casino Seld Role Embed!',
        aliases: ['offlinenotifyembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperOfflineNotifySchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the offline Notify Channel first using <:setup_casino_role:1188193188737986601>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }

        const agebannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1190066709005074543/offlinenotify.gif`)

        const agetitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Click the button To register your Absence!**__`)

        const ageembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`⚠️ Offline Notification!`)
        .setDescription(`
        <a:qdiamandemojie:1188180469720829993> \`-\` Hey there! If you're planning to go offline for a while, please click the button below to notify us with the details <a:goldcupemojie:1188179958221254777> !\n
        \n
        `)
        .setFields(
            {
                name: `<a:pinemojie:1188467677006659585> \`-\` **Instructions**`,
                value: `
                <a:arowwemojie:1188198147772653629>Click the button to fill in the absence details.\n
                `,
                inline: false
            },
            {
                name: `<a:attention:1188472331094474903> \`-\` **Reminder**`,
                value: `
                <:arrowflipet:1188472519213207582>Please ensure to provide an estimated return time and reason for your absence.\n
                `,
                inline: false
            },
        )
        .setFooter({text :`Copyright © ${message.guild.name}.Network, Inc. All rights reserved By ${message.guild.name}`, iconURL: message.guild.iconURL()})

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`offlinenotify_button`)
            .setEmoji(`<a:oflineemojie:1188865003630108672>`)
            .setStyle(1)
            .setLabel(`・Offline Notify`),
        );


        message.channel.send({ embeds: [agebannerembed, agetitleembed, ageembed],  components: [buttons]})

    }
};