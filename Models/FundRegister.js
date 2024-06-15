const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const fundRegisterSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  companyName: { type: String, required: false },
  address: { type: String, required: true },
  countryCode: { type: String, required: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
});

fundRegisterSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

fundRegisterSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const FundRegister = mongoose.model('FundRegister', fundRegisterSchema);
module.exports = FundRegister;
