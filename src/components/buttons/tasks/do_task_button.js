const { EmbedBuilder } = require('discord.js');
const HelperTasksManagerSchema = require('../../../schemas/HelperTasksManagerSchema');
const HelperTasksDataSchema = require('../../../schemas/HelperTasksDataSchema');

// Define the roles to be excluded from the count
const excludedRoles = [
  '1162057198596260051',
  '1143878557790126231',
  '1178344126136189060',
  '1178125596396625940',
  '1178125709038850068',
  '1162743533720051773',
  '1162743206618861609',
  '1183056436230627449',
  '1173004241279922248',
];

module.exports = {
  customId: 'task_button',

  run: async (client, interaction) => {
    try {
      // Check if the user is connected to a voice channel
      const member = interaction.guild.members.cache.get(interaction.user.id);
      if (!member.voice.channel) {
        // User is not connected to a voice channel
        return interaction.reply({
          content: `You need to be connected to a voice channel to use this command.`,
          ephemeral: true,
        });
      }

      // User is connected to a voice channel, proceed with the logic
      const voiceChannel = member.voice.channel;

      // Check if the voice channel name matches the user's nickname pattern
      if (!isVoiceChannelValid(voiceChannel, member)) {
        return interaction.reply({
          content: `Hey This Voice Channel is not yours \):  !!!`,
          ephemeral: true,
          flags: [4096]
        });
      }

      // Get all members in the voice channel
      const membersInVoiceChannel = voiceChannel.members;

      // Separate excluded and non-excluded users
      const { excludedUsers, nonExcludedUsers } = separateUsers(membersInVoiceChannel);

      // Check if there are 2 or more non-excluded users
      if (nonExcludedUsers.size >= 2) {
        // Check the user's cooldown
        const guildId = interaction.guild.id;
        const userId = interaction.user.id;

        // Check the lastTask time in the HelperTasksDataSchema
        const userData = await HelperTasksDataSchema.findOne({ guildid: guildId, userId: userId });
        const lastTaskTime = parseInt(userData?.lastTask) || 0;

        // Check if the user is within cooldown
        const cooldownData = await HelperTasksManagerSchema.findOne({ guildid: guildId });
        const cooldownTime = cooldownData.tasksCooldown ? parseInt(cooldownData.tasksCooldown) * 60 * 1000 : 0;
        if (Date.now() - lastTaskTime >= cooldownTime) {
          // Update the lastTask time in the HelperTasksDataSchema
          await HelperTasksDataSchema.findOneAndUpdate(
            { guildid: guildId, userId: userId },
            { lastTask: Date.now().toString() },
            { upsert: true, new: true }
          );

          // Additional logic can be added here for tasks logs

          // Send an embed with user id and users connected to the voice channel
          const embed = new EmbedBuilder()
            .setTitle('Task Information')
            .addFields(
              {
                name: 'User ID',
                value: interaction.user.id,
                inline: true,
              },
              {
                name: 'Non-Excluded Users',
                value: nonExcludedUsers.map(member => `<@${member.user.id}>`).join(', '),
                inline: true,
              },
              {
                name: 'Excluded Users',
                value: excludedUsers.map(member => `<@${member.user.id}>`).join(', '),
                inline: true,
              },
              {
                name: 'Total Non-Excluded Members',
                value: nonExcludedUsers.size.toString(), // Convert to string
              }
            )
            .setColor('Random');

          // Send the embed to the tasksLogs channel
          const tasksLogsChannelId = cooldownData.tasksLogs; // Assuming tasksLogs is a text channel ID
          const tasksLogsChannel = interaction.guild.channels.cache.get(tasksLogsChannelId);
          if (tasksLogsChannel) {
            tasksLogsChannel.send({ embeds: [embed] });
          } else {
            console.error(`Tasks Logs channel not found.`);
          }
        } else {
          const remainingCooldown = Math.ceil((cooldownTime - (Date.now() - lastTaskTime)) / 1000);
          return interaction.reply({
            content: `Please wait ${remainingCooldown / 60} seconds before using this command again.`,
            ephemeral: true,
          });
        }
      } else {
        // Not enough non-excluded users in the voice channel
        interaction.reply({
          content: `You need to have at least 2 Non staff team Members in your voice to a task \): ..!!.`,
          ephemeral: true,
          flags: [4096]
        });
      }
    } catch (error) {
      console.error('Error in the task button command:', error);
      interaction.reply({
        content: `An error occurred while processing the command. Please try again later.`,
        ephemeral: true,
      });
    }
  },
};

// Separate users into excluded and non-excluded based on roles
function separateUsers(members) {
  const excludedUsers = members.filter(member => excludedRoles.some(roleId => member.roles.cache.has(roleId)));
  const nonExcludedUsers = members.filter(member => !excludedRoles.some(roleId => member.roles.cache.has(roleId)));

  return { excludedUsers, nonExcludedUsers };
}

// Check if the voice channel name matches the user's nickname pattern
function isVoiceChannelValid(voiceChannel, member) {
  const nicknamePattern = `${member.displayName}.*`;
  return new RegExp(nicknamePattern, 'i').test(voiceChannel.name);
}

