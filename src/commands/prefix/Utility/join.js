const { Message } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    structure: {
        name: 'join',
        description: 'Make The Bot Join A Voice Channel!',
        aliases: ['connect'],
        permissions: 'Administrator',
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    async run(client, message, args) {
        try {
            // Ensure a voice channel ID or mention is provided
            if (!args[0]) {
                return message.reply('Please specify a voice channel ID or mention.');
            }

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

            console.log('Channel:', channel);

            // Check if the channel is a voice channel or stage channel
            if (!channel || (channel.type !== 'GUILD_VOICE' && channel.type !== 'GUILD_STAGE_VOICE')) {
                return message.reply('Invalid or non-existent voice channel provided.');
            }

            console.log('Joining voice channel:', channel.name);

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: client.voiceAdapterCreator.createAdapter(),
            });

            console.log('Connection:', connection);

            // Now you can use the 'connection' variable to interact with the voice connection

            message.reply(`Joined **${channel.name}**!`);
        } catch (error) {
            console.error('Error joining voice channel:', error);
            message.reply('Failed to join the voice channel. Please check permissions and try again.');
        }
    }
};
