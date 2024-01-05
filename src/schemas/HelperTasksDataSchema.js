const { model, Schema } = require('mongoose');

module.exports = model('HelperTasksDataSchema',
  new Schema({
    guildid: {
      type: String,
      required: true
    },
    userId: {
      type: String
    },
    lastTask: {
      type: String
    },
    xp: {
      type: Number,
      default: 0
    },
    daytasks: {
      type: Number,
      default: 0
    },
    weektasks: {
      type: Number,
      default: 0
    },
  })
);
