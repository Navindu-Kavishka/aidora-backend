// backend/models/FundRegister.js
const mongoose = require('mongoose');

const FundRegisterSchema = new mongoose.Schema({
   
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('FundRegister', FundRegisterSchema);
