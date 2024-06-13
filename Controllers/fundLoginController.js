const FundRegister = require('../Models/FundRegister');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if a user with the provided email exists
        const user = await FundRegister.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If login is successful, return a success message
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
