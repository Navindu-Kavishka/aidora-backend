// Import necessary modules
const FundRegister = require('../Models/FundRegister');
const bcrypt = require('bcryptjs');

// Register a new fundraiser
const registerFundraiser = async (req, res) => {
    const { firstname, lastname, email, companyName, address, countryCode, number, password } = req.body;

    console.log(firstname, lastname, email, companyName, address, countryCode, number, password);

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
        console.log(newFundraiser);
        
        await newFundraiser.save();

       
        res.status(201).json({ message: 'Fundraiser registered successfully' });
    } catch (error) {
        console.error('Error registering fundraiser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerFundraiser,
};
