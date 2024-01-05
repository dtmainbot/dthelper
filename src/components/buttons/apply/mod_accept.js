const { EmbedBuilder } = require('discord.js');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');

module.exports = {
    customId: 'moderator_accept',
    
    run: async (client, interaction) => {
        // Get the user ID from the embed interaction
        const userId = interaction.message.embeds[0].footer.text;

        // Check if the user has the manage roles permission or the managerRole in the server
        const member = interaction.guild.members.cache.get(userId);
        const hasManageRolesPermission = interaction.member?.permissions.has('ManageRoles');
        const hasManagerRole = member.roles.cache.has(HelperApplySchema.managerRole);

        let newembed = new EmbedBuilder(
            interaction.message.embeds[0]
        ).setFooter({text: `Application Accepted By: ${interaction.user.username}`, iconURL: interaction.guild.iconURL()});

        // If the user has the necessary permissions, give them the modRole
        if (hasManageRolesPermission || hasManagerRole) {
            const helperApplyData = await HelperApplySchema.findOne({ guildid: interaction.guild.id });
            const modRole = helperApplyData.modRole;

            // Assign the modRole to the user
            const role = interaction.guild.roles.cache.find(role => role.id === modRole);
            if (role) {
                member.roles.add(role);

                interaction.message.edit({
                    embeds: [newembed],
                    components: [],
                });

                // Send an embed to the applylogsChannel
                const applylogsChannelId = helperApplyData.applylogsChannel;
                const applylogsChannel = interaction.guild.channels.cache.get(applylogsChannelId);

                if (applylogsChannel) {
                    const embed = new EmbedBuilder()
                        .setTitle('<:applypaperemojie:1188462618860601415>**Application Info**')
                        .setAuthor({name: member.user.username, iconURL: member.user.displayAvatarURL()})
                        .setThumbnail(member.user.displayAvatarURL())
                        .setDescription(`
                        <:arrownna:1188528432456421467>__**User**__:\n<:arrowflipet:1188472519213207582><@${userId}>/${userId}.\n
                        <a:acceptedemojie:1188571401364447267>__**Accepted By**__:\n<:arrowflipet:1188472519213207582><@${interaction.user.id}>/${interaction.user.id}\n
                        <a:typeemojie:1188572572766453860> __**Apply Type**__:\n<:arrowflipet:1188472519213207582>\`Moderator Application\`.\n
                        `)
                        .setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL()})
                        .setColor('#2b2d31')
                        .setTimestamp();

                    applylogsChannel.send({ embeds: [embed], flags: [4096] });
                } else {
                    console.error('Error: Apply logs channel not found.');
                }

                await interaction.reply({content: `✅ Moderator role has been assigned to <@${userId}>..`, flags: [4096], ephemeral: true});
                
                const userEmbed = new EmbedBuilder()
                .setAuthor({name: interaction.guild.name, iconURL: member.displayAvatarURL()})
                .setTitle('<a:onlineemojie:1188864793646465075> **Successfully Accepted**')
                .setDescription(`
                <a:redaStar:1188863679001800805> Hello ${member}\n
                <:arrownna:1188528432456421467>You Mod Application is Accepted By $<@${interaction.user.id}> In Server **${interaction.guild.name}**.\n
                <:arrownna:1188528432456421467>__**User**__:\n<:arrowflipet:1188472519213207582>${member}/${userId}.\n
                <a:acceptedemojie:1188571401364447267>__**Accepted By**__:\n<:arrowflipet:1188472519213207582><@${interaction.user.id}>/${interaction.user.id}\n
                <a:typeemojie:1188572572766453860> __**Apply Type**__:\n<:arrowflipet:1188472519213207582>\`Moderator Application\`.\n
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
            } else {
                await interaction.reply({content: 'Error: Moderator role not found.', flags: [4096], ephemeral: true});
            }
        } else {
            await interaction.reply({content: 'Error: You do not have the required permissions to use this button.', flags: [4096], ephemeral: true });
        }
    },
};