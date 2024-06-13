

const mongoose = require('mongoose');

const FundProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  phoneNumber: { type: String },
  countryCode: { type: String, default: '+1' },
  password: { type: String, required: true }
});

const FundProfile = mongoose.model('FundProfile', FundProfileSchema);

module.exports = FundProfile;
