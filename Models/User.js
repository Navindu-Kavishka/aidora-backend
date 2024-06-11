const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        countryCode: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
