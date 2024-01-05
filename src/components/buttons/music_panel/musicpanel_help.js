const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');


module.exports = {
    customId: 'musicpanel_help',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const musichelp = new EmbedBuilder()
        .setAuthor({name: interaction.guild.name + `'s Community' Music.`, iconURL: interaction.guild.iconURL()})
        .setTitle(`<a:tuneemojie:1189975801559519242> Available Commands!`)
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`
        <a:arowwemojie:1188198147772653629>**music**
            \`autoplay\`, \`grab\`, \`clearqueue\`, \`join\`, \`leave\`, \`loop\`, \`pause\`, \`nowplaying\`, \`play\`, \`queue\`, \`remove\`, \`search\`, \`resume\`, \`seek\`, \`shuffle\`, \`skip\`, \`skipto\`, \`stop\`, \`volume\`
        <a:arowwemojie:1188198147772653629>**filters**
            \`8d\`, \`bassboost\`, \`distorsion\`, \`nightcore\`, \`pitch\`, \`karaoke\`, \`reset\`, \`rotation\`, \`speed\`, \`tremolo\`, \`vibrato\`, \`lowpass\`
        <a:arowwemojie:1188198147772653629>**info**
            \`help\`
        <a:arowwemojie:1188198147772653629>**playlist**
            \`add\`, \`create\`, \`delete\`, \`load\`

        ***<a:underageemojie:1187745383556841512> #If you need assistance or have questions, feel free to ask!***
        `)
        .setFooter({text: `Made By KwaYLen ©`, iconURL: interaction.member.displayAvatarURL()})
        .setColor(`Random`)


        await interaction.reply({ embeds: [musichelp], ephemeral: true ,flags: [4096] })


    }
};