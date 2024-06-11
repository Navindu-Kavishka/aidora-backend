const mongoose = require('mongoose');

const { Schema } = mongoose;

const fundLoginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const FundLogin = mongoose.model('FundLogin', fundLoginSchema);

module.exports = FundLogin;
