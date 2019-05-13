const commonSetting = require('../config/common_settings');
const mongoose      = require('mongoose');

mongoose.connect(commonSetting.db.url, commonSetting.db.options);

const Schema = mongoose.Schema;

let messageSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: [/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/, props => `${props.value} is not a valid email!`]
  },
  text: {
    type: String,
    required: true,
    min: 1,
    max: 99
  },
  create: {
    type: Date,
    required: true
  },
  update: {
    type: Date,
  },
});

messageSchema.statics = {
  getSingel(id, callback) {
    let Message = this;
    Message
      .findById(id)
      .exec((err, messege) => {
        if (err) return callback(err);
        return callback(null, messege);
      });
  },
  create(params, callback) {
    let Message    = this;
    let newMessage = new Message(params);
    let error      = newMessage.validateSync();

    if (error) {
      return callback(error.errors);
    }

    newMessage.save(callback);
  },
  getList(page, pageSize, callback ) {
    let Message = this;
    Message
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .exec(callback);
  }
};

module.exports.Message = mongoose.model('Message', messageSchema);
