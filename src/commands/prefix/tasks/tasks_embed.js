const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const HelperTasksManagerSchema = require('../../../schemas/HelperTasksManagerSchema');

module.exports = {
    structure: {
        name: 'tasks-embed',
        description: 'Send The Tasks Embed!',
        aliases: ['tasksembed'],
        cooldown: 30000,
        permissions: 'Administrator',
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message) => {

        const data = await HelperTasksManagerSchema.findOne({ guildid: message.guild.id })

        const notdataembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`- <@${message.author.id}>: setup the tasks system first using <:setup_casino_role:1188193188737986601>`)

     if (!data){
        return message.reply({ embeds: [notdataembed], ephemeral: true, flags: [4096] })
     }

        const tasksbannerembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1191132337627476102/tasks.gif`)

        const taskstitleembed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`め 」 __**Click The Button Bellow To do your Task!**__`)

        const tasksembed = new EmbedBuilder()
        .setColor(`#2b2d31`)
        .setTitle(`<:task:1191136456073281546> ${message.guild.name}\`s Tasks Center!`)
        .setThumbnail(message.guild.iconURL())
        .setFields(
            {
                name: `<a:pinemojie:1188467677006659585> \`-\` **Tasks Rules**`,
                value: `
                <a:arowwemojie:1188198147772653629>You Must do the task in you one tap voice.
                <a:arowwemojie:1188198147772653629>You Must do a task every \`${data.tasksCooldown || `No cooldown provided` }\`
                <a:arowwemojie:1188198147772653629>You Must have to normal member or above in your voice to do a task.\n
                `,
                inline: false
            },
            {
                name: `<a:attention:1188472331094474903> \`-\` **Important**`,
                value: `
                <a:arowwemojie:1188198147772653629>If the number of normal members in your task voice is more than 2 you gonna get more xp.
                <a:arowwemojie:1188198147772653629>If you send a false tasks you gonna lose xp.
                <a:arowwemojie:1188198147772653629>To check the leaderboard use (.desert tasks-lb).
                <a:arowwemojie:1188198147772653629>To check your xp and level use the (.desert tasks-rank) command.\n
                `,
                inline: false
            },
        )
        .setFooter({text :`${message.guild.name}\`s Tasking system © | Powerd By: KwaYLen`, iconURL: message.guild.iconURL()})

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`task_button`)
            .setEmoji(`<:task:1191136456073281546>`)
            .setStyle(2)
            .setLabel(`・Do a task`),
        );


        message.channel.send({ embeds: [tasksbannerembed, taskstitleembed, tasksembed],  components: [buttons]})

    }
};