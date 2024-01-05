const { ModalSubmitInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Embed } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const HelperApplyQuestionsSchema = require('../../../schemas/HelperApplyQuestionsSchema');
const HelperApplySchema = require('../../../schemas/HelperApplySchema');


module.exports = {
    customId: 'designer-modal',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const questions = await HelperApplyQuestionsSchema.findOne({ guildid: interaction.guild.id })
        const data = await HelperApplySchema.findOne({ guildid: interaction.guild.id })

        const applychannel = client.channels.cache.get(data.finichedapplyChannel);
        if (!applychannel) {
            return console.error('Error: Finished apply channel is not defined.');
        }

        const q1_Input = interaction.fields.getTextInputValue('designer_q1');
        const q2_Input = interaction.fields.getTextInputValue('designer_q2');
        const q3_Input = interaction.fields.getTextInputValue('designer_q3');
        const q4_Input = interaction.fields.getTextInputValue('designer_q4');
        const q5_Input = interaction.fields.getTextInputValue('designer_q5');

        const submitembed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(`<a:doneemoje:1188536782770409483> <@${interaction.user.id}>: Designer Application Has been sent to review!`)

        const embeds = new EmbedBuilder()
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()})
        .setColor(`Random`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTitle(`<:designeremojie:1188476494805209208> **${interaction.user.username}\`s Application For Designer!**\n`)
        .setDescription(`
        \`q1\`: **${questions.designer_q1}**
        <:arrownna:1188528432456421467> ${q1_Input}

        \`q2\`: **${questions.designer_q2}**
        <:arrownna:1188528432456421467> ${q2_Input}
        
        \`q3\`: **${questions.designer_q3}**
        <:arrownna:1188528432456421467> ${q3_Input}
        
        \`q4\`: **${questions.designer_q4}**
        <:arrownna:1188528432456421467> ${q4_Input}
        
        \`q5\`: **${questions.designer_q5}**
        <:arrownna:1188528432456421467> ${q5_Input}
        
        <a:attention:1188472331094474903> **Application Stats**
        <:arrowflipet:1188472519213207582>UserId:\`${interaction.user.id}\`
        <:arrowflipet:1188472519213207582>Username:\`${interaction.user.username}\`
        <:arrowflipet:1188472519213207582>User:<@${interaction.user.id}>
        <:arrowflipet:1188472519213207582>Application Type:\`Designer Application\`\n
        `)
        .setFooter({text: interaction.user.id, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp()


        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`designer_accept`)
            .setLabel(`Accept`)
            .setStyle(3),
            new ButtonBuilder()
            .setCustomId(`designer_deny`)
            .setLabel(`Deny`)
            .setStyle(4),
            new ButtonBuilder()
            .setCustomId(`designer_accept_wr`)
            .setLabel(`Accept With Reason`)
            .setStyle(3),
            new ButtonBuilder()
            .setCustomId(`designer_deny_wr`)
            .setLabel(`Deny With Reason`)
            .setStyle(4),
            new ButtonBuilder()
            .setCustomId(`designer_blacklist`)
            .setLabel(`Blacklist`)
            .setStyle(1),
        )
        

        await interaction.reply({embeds: [submitembed], ephemeral: true, flags: [4096]});
        await applychannel.send({embeds: [embeds], components: [buttons]});

    }
};