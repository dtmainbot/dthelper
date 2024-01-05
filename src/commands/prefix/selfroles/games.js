const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperGamesRolesSchema = require('../../../schemas/HelperGamesRolesSchema');

module.exports = {
    structure: {
        name: 'games-self-role',
        description: 'Send The Personality Self role Embed!',
        aliases: ['gamesembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperGamesRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_situation_roles:1187797971618762783>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }


        const gamesbannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1187873324303396985/games.gif`)

        const gamestitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Choose your Games!**__`)

        const gamesembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<a:gamesemojie:1187871588901732362> Games Roles`)
        .setDescription(`
        Select your Games role from the menu below!
        
        <:freefireemojie:1187859465253421066>୨✦\`-\`<@&${data.freefireRole || `\`No Role Provided\``}>
        ✧
        <:pubgemojie:1187859796884463818>୨✦\`-\`<@&${data.pubgRole || `\`No Role Provided\``}>
        ✧
        <:valorantemojie:1187859597676003518>୨✦\`-\`<@&${data.valorantRole || `\`No Role Provided\``}>
        ✧
        <:fortniteemoji:1187859658497593474>୨✦\`-\`<@&${data.fortniteRole || `\`No Role Provided\``}>
        ✧
        <:farlightemojie:1187859719554080839>୨✦\`-\`<@&${data.farlightRole || `\`No Role Provided\``}>
        ✧
        <:csgo:1187859999586799667>୨✦\`-\`<@&${data.csgoRole || `\`No Role Provided\``}>
        ✧
        <:gtaemojie:1187860449740455968>୨✦\`-\`<@&${data.gtaRole || `\`No Role Provided\``}>
        ✧
        <a:minecraftemojie:1187860303829008456>୨✦\`-\`<@&${data.minecraftRole || `\`No Role Provided\``}>
        ✧
        <:codemojie:1187860207737512157>୨✦\`-\`<@&${data.callofduttyRole || `\`No Role Provided\``}>
        ✧
        <:lolemojie:1187861778491781170>୨✦\`-\`<@&${data.leagueoflegendsRole || `\`No Role Provided\``}>
        ✧
        <:brawlhalla:1187860576534270022>୨✦\`-\`<@&${data.brawlhallaRole || `\`No Role Provided\``}>
        ✧
        <a:efootballemojie:1187870298587021412>୨✦\`-\`<@&${data.efootballRole || `\`No Role Provided\``}>
        ✧
        <:rustemojie:1187874309402787901>୨✦\`-\`<@&${data.rustRole || `\`No Role Provided\``}>

        `)

        const buttons_row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`freerole_button`)
            .setEmoji(`<:freefireemojie:1187859465253421066>`)
            .setStyle(1)
            .setLabel(`・Free Fire`),
            new ButtonBuilder()
            .setCustomId(`pubgrole_button`)
            .setEmoji(`<:pubgemojie:1187859796884463818>`)
            .setStyle(1)
            .setLabel(`・Pubg`),
            new ButtonBuilder()
            .setCustomId(`valorantrole_button`)
            .setEmoji(`<:valorantemojie:1187859597676003518>`)
            .setStyle(1)
            .setLabel(`・Valorant`),
            new ButtonBuilder()
            .setCustomId(`fortniterole_button`)
            .setEmoji(`<:fortniteemoji:1187859658497593474>`)
            .setStyle(1)
            .setLabel(`・Fortnite`),
            new ButtonBuilder()
            .setCustomId(`farlightrole_button`)
            .setEmoji(`<:farlightemojie:1187859719554080839>`)
            .setStyle(1)
            .setLabel(`・Farlight`),
        );
        const buttons_row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`csgorole_button`)
            .setEmoji(`<:csgo:1187859999586799667>`)
            .setStyle(1)
            .setLabel(`・Cs-go`),
            new ButtonBuilder()
            .setCustomId(`gtarole_button`)
            .setEmoji(`<:gtaemojie:1187860449740455968>`)
            .setStyle(1)
            .setLabel(`・Gta`),
            new ButtonBuilder()
            .setCustomId(`minecraftrole_button`)
            .setEmoji(`<a:minecraftemojie:1187860303829008456>`)
            .setStyle(1)
            .setLabel(`・Minecraft`),
            new ButtonBuilder()
            .setCustomId(`codrole_button`)
            .setEmoji(`<:codemojie:1187860207737512157>`)
            .setStyle(1)
            .setLabel(`・Call Of Duty`),
            new ButtonBuilder()
            .setCustomId(`lolrole_button`)
            .setEmoji(`<:lolemojie:1187861778491781170>`)
            .setStyle(1)
            .setLabel(`・League Of Legends`),
        );
        const buttons_row3 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`brawlhallarole_button`)
            .setEmoji(`<:brawlhalla:1187860576534270022>`)
            .setStyle(1)
            .setLabel(`・BrawlHalla`),
            new ButtonBuilder()
            .setCustomId(`efootballrole_button`)
            .setEmoji(`<a:efootballemojie:1187870298587021412>`)
            .setStyle(1)
            .setLabel(`・E-football`),
            new ButtonBuilder()
            .setCustomId(`rustrole_button`)
            .setEmoji(`<:rustemojie:1187874309402787901>`)
            .setStyle(1)
            .setLabel(`・Rust`),
            new ButtonBuilder()
            .setCustomId(`gamesclearrole_button`)
            .setEmoji(`<a:clearemojie:1188137273271799909>`)
            .setStyle(2)
            .setLabel(`・Clear`),
        );

        message.channel.send({ embeds: [gamesbannerembed, gamestitleembed, gamesembed],  components: [buttons_row1, buttons_row2, buttons_row3]})

    }
};
