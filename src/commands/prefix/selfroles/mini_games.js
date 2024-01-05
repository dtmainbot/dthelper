const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperMiniGamesRolesSchema = require('../../../schemas/HelperMiniGamesRolesSchema');

module.exports = {
    structure: {
        name: 'minigames-self-role',
        description: 'Send The Personality Self role Embed!',
        aliases: ['minigamesembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperMiniGamesRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_situation_roles:1187797971618762783>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }


        const minigamesbannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1187873324303396985/games.gif`)

        const minigamestitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Choose your Mini Games!**__`)

        const minigamesembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<a:gamesemojie:1187871588901732362> Mini Games Roles`)
        .setDescription(`
        Select your Mini Games roles from the menu below!
        
        <:amongemojie:1187860723368464394>୨✦\`-\`<@&${data.amongusRole || `\`No Role Provided\``}>
        ✧
        <a:parcouremojie:1187861587583840326>୨✦\`-\`<@&${data.parkourRole || `\`No Role Provided\``}>
        ✧
        <:codemanesemojie:1187861230212370444>୨✦\`-\`<@&${data.codenamesRole || `\`No Role Provided\``}>
        ✧
        <:chessemojie:1188139895533875242>୨✦\`-\`<@&${data.chessRole || `\`No Role Provided\``}>
        ✧
        <:parchisiemojie:1188140025414692915>୨✦\`-\`<@&${data.parchisiRole || `\`No Role Provided\``}>
        ✧
        <:garticemojie:1188140197066580009>୨✦\`-\`<@&${data.garticphoneRole || `\`No Role Provided\``}>

        `)

        const buttons_row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`amongusrole_button`)
            .setEmoji(`<:amongemojie:1187860723368464394>`)
            .setStyle(1)
            .setLabel(`・Among Us`),
            new ButtonBuilder()
            .setCustomId(`parkourrole_button`)
            .setEmoji(`<a:parcouremojie:1187861587583840326>`)
            .setStyle(1)
            .setLabel(`・Parkour`),
            new ButtonBuilder()
            .setCustomId(`codenamesrole_button`)
            .setEmoji(`<:codemanesemojie:1187861230212370444>`)
            .setStyle(1)
            .setLabel(`・Code Names`),
            new ButtonBuilder()
            .setCustomId(`chessrole_button`)
            .setEmoji(`<:chessemojie:1188139895533875242>`)
            .setStyle(1)
            .setLabel(`・Chess`),
            new ButtonBuilder()
            .setCustomId(`parchisirole_button`)
            .setEmoji(`<:parchisiemojie:1188140025414692915>`)
            .setStyle(1)
            .setLabel(`・Parchisi`),
        );
        const buttons_row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`garticphonerole_button`)
            .setEmoji(`<:garticemojie:1188140197066580009>`)
            .setStyle(1)
            .setLabel(`・Gartic Phone`),
            new ButtonBuilder()
            .setCustomId(`minigamesclearrole_button`)
            .setEmoji(`<a:clearemojie:1188137273271799909>`)
            .setStyle(2)
            .setLabel(`・Clear`),
        );

        message.channel.send({ embeds: [minigamesbannerembed, minigamestitleembed, minigamesembed],  components: [buttons_row1, buttons_row2]})

    }
};
