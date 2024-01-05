const { Message, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../schemas/GuildSchema');

module.exports = {
    structure: {
        name: 'musicpanel',
        description: 'send the music panel embed!',
        aliases: ['musicstats'],
        cooldown: 15000,
        permissions: 'Administrator'
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        
        const musicpanelembed = new EmbedBuilder()
        .setAuthor({name: message.guild.name + `'s Music Panel`, iconURL: `https://cdn.discordapp.com/emojis/1187022489088446474.gif`})
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**☊」\`m!play\`      For: <@411916947773587456> bots
        ☊」\`!play\`      For: <@1183492341789638696>
        ☊」\`+play\`      For: <@1183490329316442172>
        ☊」\`.play\`      For: <@1183490897757884559>
        ☊」\`$play\`      For: <@1183492890551390248>
        ☊」\`&play\`      For: <@1183493471978393762>
        ☊」\`<play\`      For: <@1183535350161875086>
        ☊」\`,play\`      For: <@1183491786790932490>
        ☊」\`^play\`      For: <@1183527519199166494>
        ☊」\`=play\`      For: <@1183494665350160495>
        ☊」\`>play\`      For: <@1183529930986885140>
        ☊」\`?play\`      For: <@1183496424869081098>
        ☊」\`;play\`      For: <@1183525298399105086>
        ☊」\`%play\`      For: <@1183537607783743598>
        ☊」\`'play\`      For: <@1183517324641308802>
        ☊」\`*play\`      For: <@1183494094987731005>
        ☊」\`-play\`      For: <@1183489468687192065>
        ☊」\`\\play\`      For: <@1183565048216559646>\n
        **[##] This are the Music Bots that can Help you have a great time in our server ! enjoy <a:blackheart1:1187035619231268864>**
        **`)
        .setImage(`https://media.discordapp.net/attachments/1187022031825420370/1187031903375732756/6.gif`)
        .setFooter({text: `Click The Get A bot! button to Get your bot.`, iconURL: message.guild.iconURL()});


        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setStyle(1)
            .setLabel(`Get A Bot!`)
            .setEmoji(`<a:musicmilodi1:1187024651952607243>`)
            .setCustomId(`musicpanel_getbot`),
            new ButtonBuilder()
            .setStyle(1)
            .setLabel(`Bots Stats`)
            .setEmoji(`<a:musicmilodi1:1187024651952607243>`)
            .setCustomId(`musicpanel_botsstats`),
            new ButtonBuilder()
            .setStyle(2)
            .setLabel(`Help`)
            .setEmoji(`<a:pinkexclamemark1:1187041846170488934>`)
            .setCustomId(`musicpanel_help`)
        )


        await message.channel.send({ embeds: [musicpanelembed], components: [buttons]})

    }
};
