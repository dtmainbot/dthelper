const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperSituationRolesSchema = require('../../../schemas/HelpersituationRolesSchema');

module.exports = {
    structure: {
        name: 'situation-self-role',
        description: 'Send The Situation Self role Embed!',
        aliases: ['situationembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperSituationRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_situation_roles:1187797971618762783>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }


        const situationbannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1187813707519119431/situation.gif`)

        const situationtitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Choose your situation!**__`)

        const situationembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<:CircleUser:1187748828556832860> Situation Roles`)
        .setDescription(`
        Select your situation role from the menu below!
        
        <:singleemojie:1187813884908814387>୨✦\`-\`<@&${data.singleRole || `\`No Role Provided\``}>
        ✧
        <a:takenemojie:1187814113859088496>୨✦\`-\`<@&${data.takenRole || `\`No Role Provided\``}>
        ✧
        <:mariedemojie:1187814248701755404>୨✦\`-\`<@&${data.mariedRole || `\`No Role Provided\``}>
        ✧
        <a:heartlessemojie:1187814364548444292>୨✦\`-\`<@&${data.heartlessRole || `\`No Role Provided\``}>
        
        `)

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`singlerole_button`)
            .setEmoji(`<:singleemojie:1187813884908814387>`)
            .setStyle(1)
            .setLabel(`・Single`),
            new ButtonBuilder()
            .setCustomId(`takenrole_button`)
            .setEmoji(`<a:takenemojie:1187814113859088496>`)
            .setStyle(1)
            .setLabel(`・Taken`),
            new ButtonBuilder()
            .setCustomId(`marriedrole_button`)
            .setEmoji(`<:mariedemojie:1187814248701755404>`)
            .setStyle(1)
            .setLabel(`・Married`),
            new ButtonBuilder()
            .setCustomId(`heartlessrole_button`)
            .setEmoji(`<a:heartlessemojie:1187814364548444292>`)
            .setStyle(1)
            .setLabel(`・Heartless`),
            new ButtonBuilder()
            .setCustomId(`situationclearrole_button`)
            .setEmoji(`<a:clearemojie:1188137273271799909>`)
            .setStyle(2)
            .setLabel(`・Clear`),
        );


        message.channel.send({ embeds: [situationbannerembed, situationtitleembed, situationembed],  components: [buttons]})

    }
};
