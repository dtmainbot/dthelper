const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperHobbiesRolesSchema = require('../../../schemas/HelperHobbiesRolesSchema');

module.exports = {
    structure: {
        name: 'hobbies-self-role',
        description: 'Send The Hobbies Self role Embed!',
        aliases: ['hobbiesembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperHobbiesRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_situation_roles:1187797971618762783>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }


        const hobbiesbannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1188261551828901898/hobbies.gif`)

        const hobbiestitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Choose your Hobbies!**__`)

        const hobbiesembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<a:hobbiesemojie:1188267374001012756> Hobbies Roles`)
        .setDescription(`
        Select your Hobbies roles from the menu below!
        
        <a:gameremojie:1188263669625257995>୨✦\`-\`<@&${data.gamerRole || `\`No Role Provided\``}>
        ✧
        <a:danceremojie:1188263771450388481>୨✦\`-\`<@&${data.dancerRole || `\`No Role Provided\``}>
        ✧
        <:singeremojie:1188263967248896030>୨✦\`-\`<@&${data.singerRole || `\`No Role Provided\``}>
        ✧
        <:artist:1188264041571958785>୨✦\`-\`<@&${data.artistRole || `\`No Role Provided\``}>
        ✧
        <a:otakuemojie:1188264178771836973>୨✦\`-\`<@&${data.otakuRole || `\`No Role Provided\``}>
        ✧
        <a:developer:1188264283813974117>୨✦\`-\`<@&${data.developerRole || `\`No Role Provided\``}>
        ✧
        <a:contentcreatoremojie:1188264380534620330>୨✦\`-\`<@&${data.content_creatorRole || `\`No Role Provided\``}>
        ✧
        <:photographer:1188264442153160744>୨✦\`-\`<@&${data.photographerRole || `\`No Role Provided\``}>
        ✧
        <:shefemojie:1188265135920386058>୨✦\`-\`<@&${data.shefRole || `\`No Role Provided\``}>
        
        `)

        const buttons_row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`gamerrole_button`)
            .setEmoji(`<a:gameremojie:1188263669625257995>`)
            .setStyle(1)
            .setLabel(`・Gamer`),
            new ButtonBuilder()
            .setCustomId(`dancerrole_button`)
            .setEmoji(`<a:danceremojie:1188263771450388481>`)
            .setStyle(1)
            .setLabel(`・Dancer`),
            new ButtonBuilder()
            .setCustomId(`singerrole_button`)
            .setEmoji(`<:singeremojie:1188263967248896030>`)
            .setStyle(1)
            .setLabel(`・Singer`),
            new ButtonBuilder()
            .setCustomId(`artistrole_button`)
            .setEmoji(`<:artist:1188264041571958785>`)
            .setStyle(1)
            .setLabel(`・Atrist`),
            new ButtonBuilder()
            .setCustomId(`otakurole_button`)
            .setEmoji(`<a:otakuemojie:1188264178771836973>`)
            .setStyle(1)
            .setLabel(`・Otaku`),
        );
        const buttons_row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`developerrole_button`)
            .setEmoji(`<a:developer:1188264283813974117>`)
            .setStyle(1)
            .setLabel(`・Developer`),
            new ButtonBuilder()
            .setCustomId(`content_creatorrole_button`)
            .setEmoji(`<a:contentcreatoremojie:1188264380534620330>`)
            .setStyle(1)
            .setLabel(`・Content Creator`),
            new ButtonBuilder()
            .setCustomId(`photographerrole_button`)
            .setEmoji(`<:photographer:1188264442153160744>`)
            .setStyle(1)
            .setLabel(`・Photographer`),
            new ButtonBuilder()
            .setCustomId(`shefrole_button`)
            .setEmoji(`<:shefemojie:1188265135920386058>`)
            .setStyle(1)
            .setLabel(`・Shef`),
            new ButtonBuilder()
            .setCustomId(`hobbiesclearrole_button`)
            .setEmoji(`<a:clearemojie:1188137273271799909>`)
            .setStyle(2)
            .setLabel(`・Clear`),
        );


        message.channel.send({ embeds: [hobbiesbannerembed, hobbiestitleembed, hobbiesembed],  components: [buttons_row1, buttons_row2]})

    }
};
