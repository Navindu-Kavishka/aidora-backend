const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../Models/User');
dotenv.config();

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) return res.status(400).json({ message: 'Admin not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.verifyAdmin = async (req, res) => {
    const { otp } = req.body;

    try {
        // Assuming you have a method to verify the OTP
        const isValidOTP = await verifyOTP(otp);
        if (!isValidOTP) return res.status(400).json({ message: 'Invalid OTP' });

        res.status(200).json({ message: 'OTP verified' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
