const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperCasinoRolesSchema = require('../../../schemas/HelperCasinoselfRolesSchema');

module.exports = {
  structure: {
    name: 'ranks-embed',
    description: 'Send The Ranks info Embed!',
    aliases: ['ranksembed'],
    cooldown: 30000,
    permissions: 'Administrator',
  },
  /**
   * @param {ExtendedClient} client 
   * @param {Message<true>} message 
   * @param {string[]} args 
   */
  run: async (client, message) => {
    const rankstitleembed = new EmbedBuilder()
      .setColor(`Random`)
      .setTitle(`<:happyjack:1192154834263089274> 」 __**✦ ・ Curious about obtaining ranking roles in our community? (｡ ･ ω ･｡) !**__`)

    const ranksbannerembed = new EmbedBuilder()
      .setColor(`#2b2d31`)
      .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1192155934475173908/ranks_image.gif`)

    const rankshelpembed = new EmbedBuilder()
      .setColor(`#2b2d31`)
      .setDescription(`
 ・It's as simple as staying active to accumulate experience points and unlock fantastic perks along the way. Your level within the rankings directly correlates with your activity level; the more engaged you are, the higher you'll ascend in the rankings!

However, the crucial factor is that your level increases automatically with each interaction within the server, granting you exclusive access to various rewards. To track your progress, utilize the \`r\` command in the <#1143720711450525707> and keep an eye on your evolving level. Additionally, discover the top-performing members in the community by using the \`t\` command.
`)

    const ranksvoiceembed = new EmbedBuilder()
      .setColor(`#2b2d31`)
      .setTitle(`<a:Asttars:1192159434466668636>「・ Voice Ranking Roles ・」`)
      .setDescription(`
      <:arrownna:1188528432456421467> ● \`Lv.10\` <@&1159273090908442635> ➟ Perm to Add Reaction.
      <:arrownna:1188528432456421467> ● \`Lv.20\` <@&1159274112489893940> ➟ Get the <@&1183427584395051069>; more controle over our music bots,
      <:arrownna:1188528432456421467> ● \`Lv.30\` <@&1159274487934631936> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.50\` <@&1159274663696945182> ➟ 4
      <:arrownna:1188528432456421467> ● \`Lv.60\` <@&1159275297699536916> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.75\` <@&1159275383775035512> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.82\` <@&1159275483800809472> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.90\` <@&1159275628751765545> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.100\` <@&1159275760763285514> ➟ 
      `)

    const rankschatembed = new EmbedBuilder()
      .setColor(`#2b2d31`)
      .setTitle(`<a:Asttars:1192159434466668636>「・ Text Ranking Roles ・」`)
      .setDescription(`
      <:arrownna:1188528432456421467> ● \`Lv.10\` <@&1159283553218089081> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.20\` <@&1159260712531660831> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.30\` <@&1159283732772048968> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.50\` <@&1159264736651776051> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.60\` <@&1159264936984322078> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.75\` <@&1159284125077884928> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.82\` <@&1159265083969515600> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.90\` <@&1159266501031907390> ➟ 
      <:arrownna:1188528432456421467> ● \`Lv.100\` <@&1159267015631044718> ➟ 

      `)



    message.channel.send({ embeds: [rankstitleembed, rankshelpembed, ranksbannerembed, ranksvoiceembed, ranksbannerembed, rankschatembed] })

  }
};
