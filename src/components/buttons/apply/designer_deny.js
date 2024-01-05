const { EmbedBuilder } = require('discord.js');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');

module.exports = {
    customId: 'designer_deny',
    
    run: async (client, interaction) => {
        // Get the user ID from the embed interaction
        const userId = interaction.message.embeds[0].footer.text;

        // Check if the user has the manage roles permission or the managerRole in the server
        const member = interaction.guild.members.cache.get(userId);
        const hasManageRolesPermission = interaction.member?.permissions.has('ManageRoles');
        const hasManagerRole = member.roles.cache.has(HelperApplySchema.managerRole);

        let newembed = new EmbedBuilder(
            interaction.message.embeds[0]
        ).setFooter({text: `Application Denyed By: ${interaction.user.username}`, iconURL: interaction.guild.iconURL()});

        if (hasManageRolesPermission || hasManagerRole) {
            const helperApplyData = await HelperApplySchema.findOne({ guildid: interaction.guild.id });

                interaction.message.edit({
                    embeds: [newembed],
                    components: [],
                });

                const applylogsChannelId = helperApplyData.applylogsChannel;
                const applylogsChannel = interaction.guild.channels.cache.get(applylogsChannelId);

                if (applylogsChannel) {
                    const embed = new EmbedBuilder()
                        .setTitle('<:applypaperemojie:1188462618860601415>**Application Info**')
                        .setAuthor({name: member.user.username, iconURL: member.user.displayAvatarURL()})
                        .setThumbnail(member.user.displayAvatarURL())
                        .setDescription(`
                        <:arrownna:1188528432456421467>__**User**__:\n<:arrowflipet:1188472519213207582><@${userId}>/${userId}.\n
                        <a:acceptedemojie:1188571401364447267>__**Denyed By**__:\n<:arrowflipet:1188472519213207582><@${interaction.user.id}>/${interaction.user.id}\n
                        <a:typeemojie:1188572572766453860> __**Apply Type**__:\n<:arrowflipet:1188472519213207582>\`Designer Application\`.\n
                        `)
                        .setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL()})
                        .setColor('#2b2d31')
                        .setTimestamp();

                    applylogsChannel.send({ embeds: [embed], flags: [4096] });
                } else {
                    console.error('Error: Apply logs channel not found.');
                }

                const userEmbed = new EmbedBuilder()
                .setAuthor({name: interaction.guild.name, iconURL: member.displayAvatarURL()})
                .setTitle('<a:onlineemojie:1188864793646465075> **Successfully Denyed**')
                .setDescription(`
                <a:redaStar:1188863679001800805> Hello ${member}\n
                <:arrownna:1188528432456421467>You Designer Application is Denyed By $<@${interaction.user.id}> In Server **${interaction.guild.name}**.\n
                <:arrownna:1188528432456421467>__**User**__:\n<:arrowflipet:1188472519213207582>${member}/${userId}.\n
                <a:acceptedemojie:1188571401364447267>__**Denyed By**__:\n<:arrowflipet:1188472519213207582><@${interaction.user.id}>/${interaction.user.id}\n
                <a:typeemojie:1188572572766453860> __**Apply Type**__:\n<:arrowflipet:1188472519213207582>\`Designer Application\`.\n
                `)
                .setThumbnail(interaction.guild.iconURL())
                .setColor('#2b2d31')
                .setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL()})
                .setTimestamp();

                try {
                    await member.send({ embeds: [userEmbed], flags: [4096], ephemeral: true });
                } catch (error) {
                    // Handle the error, check if it's due to the user disabling DMs or blocking the bot
                    if (error.code === 50007) {
                    } else {
                    }
                }
            }
            await interaction.reply({content: `- ✅ You Have succesfully Denyed <@${userId}>.`, flags: [4096], ephemeral: true });
    },
};