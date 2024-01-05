const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

const botsIDsToCheck = [
    '411916947773587456',
    '1183492341789638696',
    '1183490329316442172',
    '1183490897757884559',
    '1183492890551390248',
    '1183493471978393762',
    '1183535350161875086',
    '1183491786790932490',
    '1183527519199166494',
    '1183494665350160495',
    '1183529930986885140',
    '1183496424869081098',
    '1183537607783743598',
    '1183517324641308802',
    '1183494094987731005',
    '1183489468687192065',
    '412347257233604609',
    '412347553141751808',
    '412347780841865216'
];

module.exports = {
    customId: 'musicpanel_botsstats',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        // Get the voice channels in the server
        const voiceChannels = interaction.guild.channels.cache.filter(channel => channel.type === 'GuildVoice');

        // Initialize arrays for used and unused users
        let usedUsers = [];
        let unusedUsers = [];

        // Check if each user ID is connected to a voice channel
        for (const userID of botsIDsToCheck) {
            const user = interaction.guild.members.cache.get(userID);
            if (user && user.voice && user.voice.channel) {
                usedUsers.push({ id: userID, channel: user.voice.channel });
            } else {
                unusedUsers.push(userID);
            }
        }

        // Create the embed using EmbedBuilder
        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setDescription(`<a:tuneemojie:1189975801559519242> **These are the All ${interaction.guild.name}'s Music Bots bots :**`)
            .setFields(
                {
                    name: `<a:onlineemojie:1188864793646465075> Available Bots \`${unusedUsers.length}\`:`,
                    value: unusedUsers.map(userID => `♪<@${userID}>`).join('\n') || '**All Bots are in use**',
                    inline: true,
                },
                {
                    name: `<a:oflineemojie:1188865003630108672> Busy Bots \`${usedUsers.length}\`:`,
                    value: usedUsers.map(({ id, channel }) => `♪<@${id}> in: ${channel.toString()}`).join('\n') || '**No used Bots**',
                    inline: true,
                },
            )
            .setFooter({ text: `Requested by: ` + interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setColor('Random');

        // Send the embed
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};