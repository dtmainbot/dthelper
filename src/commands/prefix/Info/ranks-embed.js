const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperCasinoRolesSchema = require('../../../schemas/HelperCasinoselfRolesSchema');

module.exports = {
    structure: {
        name: 'ranks-embed',
        description: 'Send The Ranks Embed!',
        aliases: ['ranksembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {

        const ranksbannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1188177023781326928/casino.gif`)

        const rankstitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Click The Button Bellow To Get Your Casino Role!**__`)

        const ranksembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<a:casinoemojie:1188178840158208081> Casino Help!`)
        .setDescription(`
        <a:qdiamandemojie:1188180469720829993> \`-\` Read The Help below, So you Can become a Billionaire <a:goldcupemojie:1188179958221254777> !\n
        - <a:gamesemojie:1187871588901732362> **Games**
        <a:arowwemojie:1188198147772653629> \`${data.prefix}bj\`: Play a Game of BlackJack.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}roulette\`: Play a Game of roulette.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}cf\`: Play a Game of Cock Fight.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}slot-machine\`: Bet on The Slot Machine.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}rr\`: Play a Game of Russian Roulette.

        - <a:moneyemojie:1188185782226272347> **Money**
        <a:arowwemojie:1188198147772653629> \`${data.prefix}work\`: Work to get Money.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}crime\`: Commit a Crime To get Money.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}slut\`: A nice way to get Money <:shyemojie:1188199774155972698>.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}rob <user>\`: Attempt To rob Other person Money(cash).
        <a:arowwemojie:1188198147772653629> \`${data.prefix}bal\`: Check your Balance.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}with <amount/all>\`: Withdraw Money from you Bank.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}dep <amount/all>\`: Deposit Money to your Bank.

        - <a:infoemojie:1188189838692855939> **Info**
        <a:arowwemojie:1188198147772653629> \`${data.prefix}lb\`: view the Totale Money Leader Board.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}lb -cash\`: view the Cach Leader Board.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}lb -bank\`: view the Bank Leader Board.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}rob <user>\`: Attempt To rob Other person Money(cash).

        - <:shopemojie:1188187413806338058> **Store**
        <a:arowwemojie:1188198147772653629> \`${data.prefix}shop\`: View Items in the Store.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}buy [quantity] <item name>\`: Buy an Item from the Store.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}give <member> [quantity] <item name>\`: Give a member an Item from the Store.
        <a:arowwemojie:1188198147772653629> \`${data.prefix}item-info <item name>\`: View thw Information on an item in the Store.

        \`[#]\`: dont forget to read the rules by clicking the button bellow!\n
        `)
        .setFooter({text :`Copyright © ${message.guild.name}.Network, Inc. All rights reserved By ${message.guild.name}`, iconURL: message.guild.iconURL()})


        message.channel.send({ embeds: [ranksbannerembed, rankstitleembed, ranksembed] })

    }
};