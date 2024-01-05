const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperPersonalityRolesSchema = require('../../../schemas/HelperPersonalityRolesSchema');

module.exports = {
    structure: {
        name: 'personality-self-role',
        description: 'Send The Personality Self role Embed!',
        aliases: ['personalityembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperPersonalityRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_situation_roles:1187797971618762783>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }


        const personalitybannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1187825657225416894/personality.gif`)

        const personalitytitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Choose your Personality!**__`)

        const personalityembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<:CircleUser:1187748828556832860> Personality Roles`)
        .setDescription(`
        Select your Personality role from the menu below!
        
        <a:friendlyemojie:1187826517267464242>୨✦\`-\`<@&${data.friendlyRole || `\`No Role Provided\``}>
        ✧
        <:socialemojie:1187826848281936024>୨✦\`-\`<@&${data.socialRole || `\`No Role Provided\``}>
        ✧
        <:antisocialemojie:1187827037117894828>୨✦\`-\`<@&${data.anti_socialRole || `\`No Role Provided\``}>
        ✧
        <a:toxicemojie:1187827200574103694>୨✦\`-\`<@&${data.toxicRole || `\`No Role Provided\``}>
        ✧
        <a:kindemojie:1187827466711081031>୨✦\`-\`<@&${data.kindRole || `\`No Role Provided\``}>
        ✧
        <:optimisticemojie:1187827784152797306>୨✦\`-\`<@&${data.optimisticRole || `\`No Role Provided\``}>
        ✧
        <a:funnyemojie:1187828384739364975>୨✦\`-\`<@&${data.funnyRole || `\`No Role Provided\``}>
        ✧
        <:Introvertemojie:1187828026361262150>୨✦\`-\`<@&${data.introvertRole || `\`No Role Provided\``}>
        ✧
        <:weirdemojie:1187828656203108544>୨✦\`-\`<@&${data.weirdRole || `\`No Role Provided\``}>
        ✧
        <:honestemojie:1187828806254329926>୨✦\`-\`<@&${data.honestRole || `\`No Role Provided\``}>
        
        `)

        const buttons_row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`friendlyrole_button`)
            .setEmoji(`<a:friendlyemojie:1187826517267464242>`)
            .setStyle(1)
            .setLabel(`・Friendly`),
            new ButtonBuilder()
            .setCustomId(`socialrole_button`)
            .setEmoji(`<:socialemojie:1187826848281936024>`)
            .setStyle(1)
            .setLabel(`・Social`),
            new ButtonBuilder()
            .setCustomId(`anti_socialrole_button`)
            .setEmoji(`<:antisocialemojie:1187827037117894828>`)
            .setStyle(1)
            .setLabel(`・Anti Social`),
            new ButtonBuilder()
            .setCustomId(`toxicrole_button`)
            .setEmoji(`<a:toxicemojie:1187827200574103694>`)
            .setStyle(1)
            .setLabel(`・Toxic`),
            new ButtonBuilder()
            .setCustomId(`kindrole_button`)
            .setEmoji(`<a:kindemojie:1187827466711081031>`)
            .setStyle(1)
            .setLabel(`・Kind`),
        );
        const buttons_row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`optimisticrole_button`)
            .setEmoji(`<:optimisticemojie:1187827784152797306>`)
            .setStyle(1)
            .setLabel(`・Optimistic`),
            new ButtonBuilder()
            .setCustomId(`introvertrole_button`)
            .setEmoji(`<:Introvertemojie:1187828026361262150>`)
            .setStyle(1)
            .setLabel(`・Introvert`),
            new ButtonBuilder()
            .setCustomId(`funnyrole_button`)
            .setEmoji(`<a:funnyemojie:1187828384739364975>`)
            .setStyle(1)
            .setLabel(`・Funny`),
            new ButtonBuilder()
            .setCustomId(`weirdrole_button`)
            .setEmoji(`<:weirdemojie:1187828656203108544>`)
            .setStyle(1)
            .setLabel(`・Weird`),
            new ButtonBuilder()
            .setCustomId(`honestrole_button`)
            .setEmoji(`<:honestemojie:1187828806254329926>`)
            .setStyle(1)
            .setLabel(`・Honest`),
        );

        const buttons_row3 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`personalityclearrole_button`)
            .setEmoji(`<a:clearemojie:1188137273271799909>`)
            .setStyle(2)
            .setLabel(`・Clear`),
        );

        message.channel.send({ embeds: [personalitybannerembed, personalitytitleembed, personalityembed],  components: [buttons_row1, buttons_row2, buttons_row3]})

    }
};
