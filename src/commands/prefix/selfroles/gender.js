const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperGenderRolesSchema = require('../../../schemas/HelperGenderRolesSchema');

module.exports = {
    structure: {
        name: 'gender-self-role',
        description: 'Send The Gender Self role Embed!',
        aliases: ['genderembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const data = await HelperGenderRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_gender_roles:1187797971618762783>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }

        const genderbannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1187767828829450311/gender.gif`)

        const gendertitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Choose your gender!**__`)

        const genderembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<:CircleUser:1187748828556832860> Pronoun Roles`)
        .setDescription(`
        Select your pronoun role from the menu below!
        
        <:maleemojie:1187744213769666571>୨✦\`-\`<@&${data.he_himRole || `\`No Role Provided\``}>
        ✧
        <:femaleemojie:1187744234053324830>୨✦\`-\`<@&${data.she_herRole || `\`No Role Provided\``}>
        ✧
        <a:lgbtqemojie:1187744249400274954>୨✦\`-\`<@&${data.they_themRole || `\`No Role Provided\``}>
        ✧
        <:qmarkemojie:1187744275052630167>୨✦\`-\`<@&${data.any_pronounRole || `\`No Role Provided\``}>
        
        `)

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`he_himrole_button`)
            .setEmoji(`<:maleemojie:1187744213769666571>`)
            .setStyle(1)
            .setLabel(`・He/Him`),
            new ButtonBuilder()
            .setCustomId(`she_herrole_button`)
            .setEmoji(`<:femaleemojie:1187744234053324830>`)
            .setStyle(1)
            .setLabel(`・She/Her`),
            new ButtonBuilder()
            .setCustomId(`they_themrole_button`)
            .setEmoji(`<a:lgbtqemojie:1187744249400274954>`)
            .setStyle(1)
            .setLabel(`・They/Them`),
            new ButtonBuilder()
            .setCustomId(`any_pronounrole_button`)
            .setEmoji(`<:qmarkemojie:1187744275052630167>`)
            .setStyle(1)
            .setLabel(`・Any Prounoun`),
            new ButtonBuilder()
            .setCustomId(`genderclearrole_button`)
            .setEmoji(`<a:clearemojie:1188137273271799909>`)
            .setStyle(2)
            .setLabel(`・Clear`),
        );


        message.channel.send({ embeds: [genderbannerembed, gendertitleembed, genderembed],  components: [buttons]})

    }
};
