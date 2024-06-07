const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    certificateSent: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Donation', DonationSchema);
