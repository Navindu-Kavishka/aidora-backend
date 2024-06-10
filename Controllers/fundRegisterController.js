const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.fundregisterUser = async (req, res) => {
    const { firstName, lastName, email, companyName, address, phoneNumberCountryCode, phoneNumberRest, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            companyName,
            address,
            phoneNumber: {
                countryCode: phoneNumberCountryCode,
                number: phoneNumberRest
            },
            password,
            confirmPassword // Include confirmPassword for validation
        });

        const savedUser = await newUser.save();

        // Create JWT token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
