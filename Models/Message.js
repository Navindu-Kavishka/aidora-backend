const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  profile: {
    name: String,
    avatar: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
