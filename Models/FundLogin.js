const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const fundRegisterSchema = new Schema({
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

const FundRegister = mongoose.model('FundRegister', fundRegisterSchema);

module.exports = FundRegister;
