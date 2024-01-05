const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperAgeRolesSchema = require('../../../schemas/HelperAgeRolesSchema');

module.exports = {
    structure: {
        name: 'age-self-role',
        description: 'Send The Age Seld Role Embed!',
        aliases: ['ageembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperAgeRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_gender_roles:1187797971618762783>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }

        const agebannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1187801924905472050/age.gif`)

        const agetitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Choose your Age!**__`)

        const ageembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<:CircleUser:1187748828556832860> Age Roles`)
        .setDescription(`
        Select your Age role from the menu below!
        
        <a:adultemojie:1187801342715101286>୨✦\`-\`<@&${data.adultRole || `\`No Role Provided\``}>
        ✧
        <a:underageemojie:1187745383556841512>୨✦\`-\`<@&${data.under_ageRole || `\`No Role Provided\``}>

        `)

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`adultrole_button`)
            .setEmoji(`<a:adultemojie:1187801342715101286>`)
            .setStyle(1)
            .setLabel(`・Adult (+/=18)`),
            new ButtonBuilder()
            .setCustomId(`under_agerole_button`)
            .setEmoji(`<a:underageemojie:1187745383556841512>`)
            .setStyle(1)
            .setLabel(`・Under Age (-18)`),
            new ButtonBuilder()
            .setCustomId(`ageclearrole_button`)
            .setEmoji(`<a:clearemojie:1188137273271799909>`)
            .setStyle(2)
            .setLabel(`・Clear`),
        );


        message.channel.send({ embeds: [agebannerembed, agetitleembed, ageembed],  components: [buttons]})

    }
};