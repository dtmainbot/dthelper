const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    customId: 'musicpanel_getbot',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        if (interaction.member.voice.channel) {
            const requests = await client.channels.fetch('1183887727435972669');
            await requests.send(`${interaction.member.voice.channel.id}`);
            const embed = new EmbedBuilder()
                .setDescription(`<a:acceptedemojie:1188571401364447267> <@${interaction.user.id}>: **If some bot is available, it will join your voice channel. Enjoy Listen Music.**`)
                .setColor('Random');
            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = new EmbedBuilder()
                .setDescription(`<a:aNo:1189974935226024127> <@${interaction.user.id}>: **You Are not connected To a Voice Channel, Join Voice first !!**`)
                .setColor('Random');
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};
