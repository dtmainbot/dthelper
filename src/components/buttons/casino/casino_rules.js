const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const HelperCasinoselfRolesSchema = require('../../../schemas/HelperCasinoselfRolesSchema');

module.exports = {
    customId: 'casinorules_button',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const rulesembed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}\`s Casino!`, iconURL: interaction.guild.iconURL()})
        .setTitle(`<:qmarkemojie:1187744275052630167> __Read the rules carefully__`)
        .setColor(`Random`)
        .setDescription(`\n
        **\`1\`**<a:arowwemojie:1188198147772653629>If you insult someone and they report you, you'll be muted.

        **\`2\`**<a:arowwemojie:1188198147772653629>No spamming allowed, whether it's emojis, avatars, text, or mentions. If you exceed 4 lines, you'll be considered spamming and muted.

        **\`3\`**<a:arowwemojie:1188198147772653629>Streaming is not allowed in the VIP table (blacklist).

        **\`4\`**<a:arowwemojie:1188198147772653629>It's forbidden to use scripts, such as those used in casinos (blacklist).

        **\`5\`**<a:arowwemojie:1188198147772653629>If you do not have the billionaire role, you cannot rob anyone in the VIP table (blacklist), unless you are given permission.

        **\`6\`**<a:arowwemojie:1188198147772653629>Alt accounts are not allowed. The first time, the fake account will be blacklisted, and 

        **\`7\`**<a:arowwemojie:1188198147772653629>Casino managers are responsible for enforcing the rules and determining penalties based on the leaderboard and applicable rules.

        **\`8\`**<a:arowwemojie:1188198147772653629>If you have any problems, you can tag casino managers in the report and they will help you solve them.
        
        **\`9\`**<a:arowwemojie:1188198147772653629>If you haven't played since the beginning of the season, you won't win, even if you become the top player.\n
        \`[#]\` Have Fun <a:kindemojie:1187827466711081031> !\n
        `)
        .setFooter({text: `Request By: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})

        await interaction.reply({ embeds: [rulesembed], ephemeral: true, flags: [4096] })


    },
};
