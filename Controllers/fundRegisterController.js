const FundRegister = require('../Models/FundRegister');
const bcrypt = require('bcryptjs');

// Register a new fundraiser
const registerFundraiser = async (req, res) => {
    const { firstname, lastname, email, companyName, address, countryCode, number, password } = req.body;

    try {
        const existingUser = await FundRegister.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFundraiser = new FundRegister({
            firstname,
            lastname,
            email,
            companyName,
            address,
            countryCode,
            number,
            password: hashedPassword,
        });

        await newFundraiser.save();

        res.status(201).json({ message: 'Fundraiser registered successfully' });
    } catch (error) {
        console.error('Error registering fundraiser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await FundRegister.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await FundRegister.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, companyName, address, countryCode, number } = req.body;

    try {
        const updatedUser = await FundRegister.findByIdAndUpdate(id, {
            firstname,
            lastname,
            companyName,
            address,
            countryCode,
            number,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerFundraiser,
    loginUser,
    getProfile,
    updateProfile,
};
