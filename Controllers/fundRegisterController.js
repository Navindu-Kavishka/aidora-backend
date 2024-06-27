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

// Login user
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

        res.status(200).json({ 
            message: 'Login successful',
            userId: user._id
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerFundraiser,
    loginUser,
};
