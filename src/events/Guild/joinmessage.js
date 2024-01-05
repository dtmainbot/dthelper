const ExtendedClient = require("../../class/ExtendedClient");
const { DiscordAPIError, EmbedBuilder } = require("discord.js");

// A Map to store the last DM timestamps to implement rate limiting
const dmCooldowns = new Map();

module.exports = {
  event: "guildMemberAdd",
  /**
   *
   * @param {ExtendedClient} client
   * @param {import('discord.js').GuildMember} member
   * @returns
   */
  run: async (client, member) => {
    try {
      // Fetch the user to ensure we have the latest information
      const user = await member.fetch();

      // Implement rate limiting for DMs
      const userId = user.id;
      const now = Date.now();
      const cooldownKey = `dm-${userId}`;

      if (dmCooldowns.has(cooldownKey)) {
        const expirationTime = dmCooldowns.get(cooldownKey);

        if (now < expirationTime) {
          return;
        }
      }

      // Send a DM welcome embed
      const welcomeEmbed = new EmbedBuilder()
        .setAuthor({name: member.guild.name, iconURL: member.guild.iconURL()})
        .setTitle(`め 」**__Thanks For Being an ${member.guild.name}\`s Member!__**\n`)
        .setThumbnail(member.guild.iconURL())
        .setDescription(`
        <a:kindemojie:1187827466711081031>
        Discover and share your passions, forge new connections, and revel in delightful experiences! Every nook and cranny of this server is meticulously crafted to evoke the warmth and familiarity of a cherished home. Do not hesitate to reach out should you require any assistance; we are here to ensure your stay is nothing short of extraordinary <a:friendlyemojie:1187826517267464242> !

        > <a:arowwemojie:1188198147772653629> Please join one of this channels to get Verified...

        <:arrowflipet:1188472519213207582> <#1143690414294057131>
        <:arrowflipet:1188472519213207582> <#1143690521420775526>
        <:arrowflipet:1188472519213207582> <#1143690548218171603>

        [#] \`-\` ***Have Fun <a:heartlessemojie:1187814364548444292>***

        `)
        .setImage(`https://media.discordapp.net/attachments/1187742903557173288/1190305414936547502/welcome.gif?`)
        .setColor(`#2b2d31`)
        .setTimestamp()
        .setFooter({text: `${member.guild.name} | powered by: KwaYLen`, iconURL: `https://cdn.discordapp.com/emojis/1188180469720829993.gif?`});
        

      try {
        // Attempt to send the welcome embed as a direct message
        await user.send({ content: `<a:happybearAn:1190307450943975486> \`-\` Hello, <@${member.id}>! A heartfelt welcome to you. We're delighted to have you here!"`, embeds: [welcomeEmbed] });
 
        // Set a cooldown for sending DMs
        const dmCooldownTime = config.dmCooldown || 30;
        dmCooldowns.set(cooldownKey, now + dmCooldownTime * 1000);
      } catch (error) {
        if (error instanceof DiscordAPIError && error.code === 50007) {
        } else {
        }
      }
    } catch (error) {
    }
  },
};
