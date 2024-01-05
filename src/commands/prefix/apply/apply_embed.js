const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperApplyRolesSchema = require('../../../schemas/HelperApplySchema');

module.exports = {
    structure: {
        name: 'apply-embed',
        description: 'Send The Apply Embed!',
        aliases: ['applyembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message) => {

        const data = await HelperApplyRolesSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the roles first using <:setup_casino_role:1188193188737986601>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }

        const applybannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1188460938202984519/apply.gif`)

        const applytitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Click A Button Bellow To Apply For A Role!**__`)

        const applyembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<:applypaperemojie:1188462618860601415> ${message.guild.name}\`s Application Center!`)
        .setThumbnail(message.guild.iconURL())
        .setFields(
            {
                name: `<a:pinemojie:1188467677006659585> \`-\` **Moderator Requirements**`,
                value: `
                <a:arowwemojie:1188198147772653629>You Must be 16 years of age or older.
                <a:arowwemojie:1188198147772653629>You Must Have at least rank 10 in voice channels.
                <a:arowwemojie:1188198147772653629>You Must not have a lot of warnings.\n
                `,
                inline: false
            },
            {
                name: `<a:pinemojie:1188467677006659585> \`-\` **Developer Requirements**`,
                value: `
                <a:arowwemojie:1188198147772653629>You must be proficient in a programming language commonly used for Discord bot development (JavaScript, Python, or Ruby)
                <a:arowwemojie:1188198147772653629>You must have demonstrated experience in creating and maintaining Discord bots.
                <a:arowwemojie:1188198147772653629>You must possess familiarity with Discord API and adhere to best practices for efficient and scalable bot development.\n
                `,
                inline: false
            },
            {
                name: `<a:pinemojie:1188467677006659585> \`-\` **Designer Requirements**`,
                value: `
                <a:arowwemojie:1188198147772653629>You must showcase proficiency in design tools such as Adobe Creative Suite or equivalent.
                <a:arowwemojie:1188198147772653629>You must have a strong portfolio demonstrating diverse design skills, including graphics and layouts.
                <a:arowwemojie:1188198147772653629>You must be receptive to feedback and able to collaborate effectively with team members.\n
                `,
                inline: false
            },
            {
                name: `<a:pinemojie:1188467677006659585> \`-\` **Event Hoster Requirements**`,
                value: `
                <a:arowwemojie:1188198147772653629>You must possess strong organizational skills to plan and execute engaging Discord events.
                <a:arowwemojie:1188198147772653629>You must demonstrate effective communication and engagement with community members.
                <a:arowwemojie:1188198147772653629>You must be available during event times and exhibit creativity in event planning.
                <a:arowwemojie:1188198147772653629>And Finally you Must be 18 years or older.\n\n
                `,
                inline: false
            },
            {
                name: `<a:attention:1188472331094474903> **Application Process**`,
                value: `
                <:arrowflipet:1188472519213207582>To apply, Click on one of the buttons bellow this message
                <:arrowflipet:1188472519213207582>trolling or spamming = 3 days mute from the server
                `,
                inline: false
            },
        )
        .setFooter({text :`${message.guild.name}\`s Application © | Powerd By: KwaYLen`, iconURL: message.guild.iconURL()})

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`modapply_button`)
            .setEmoji(`<a:modemojie:1188476329864204348>`)
            .setStyle(2)
            .setLabel(`・Moderator`),
            new ButtonBuilder()
            .setCustomId(`developerapply_button`)
            .setEmoji(`<a:devemojie:1188476396964675644>`)
            .setStyle(2)
            .setLabel(`・Developer`),
            new ButtonBuilder()
            .setCustomId(`designerapply_button`)
            .setEmoji(`<:designeremojie:1188476494805209208>`)
            .setStyle(2)
            .setLabel(`・Designer`),
            new ButtonBuilder()
            .setCustomId(`eventhosterapply_button`)
            .setEmoji(`<a:eventemojie:1188476575247781956>`)
            .setStyle(2)
            .setLabel(`・Event Hoster`),
        );


        message.channel.send({ embeds: [applybannerembed, applytitleembed, applyembed],  components: [buttons]})

    }
};