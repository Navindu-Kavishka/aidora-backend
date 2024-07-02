const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); 
dotenv.config();


exports.registerUser = async (req, res) => {
    const { firstName, lastName, nic, email, password, phoneNumberCountryCode, phoneNumberRest, address } = req.body;

    try {
        // Log the start of the registration attempt
        console.log("Registering user with email:", email);

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists with email:", email);
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        
        // Hash password
        console.log("Hashing password...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Original Password:", password);
        console.log("Hashed Password during registration:", hashedPassword);


        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            nic,
            email,
            password: hashedPassword,
            phoneNumber: {
                countryCode: phoneNumberCountryCode,
                number: phoneNumberRest
            },
            address
        });

        const savedUser = await newUser.save();

        // Create JWT token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Log successful registration
        console.log("User successfully registered with email:", email);

        res.status(201).json({ success: true, token });
    } catch (error) {
        // Log any errors encountered during the registration process
        console.error("Error during user registration:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Log the start of the login attempt
        console.log("Login attempt for email:", email);

        // Retrieve user from the database based on email
        const user = await User.findOne({ email });
        if (!user) {
            // Log if the user is not found in the database
            console.log("User not found with email:", email);
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Log if the user is found in the database
        console.log("User found in database with email:", email);

        // Compare the provided password with the stored hashed password
        console.log("Comparing password...");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // Log the result of password comparison
        console.log("Password match result:", isPasswordCorrect ? "Match" : "No Match");

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Log if password is successfully verified
        console.log("Password verified successfully. Sending response...");
        res.status(200).json({ success: true, result: user });
    } catch (error) {
        // Log any errors encountered during the process
        console.error("Error during login process:", error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { firstName, lastName, email, address, phoneNumberCountryCode, phoneNumberRest, currentPassword, newPassword, retypePassword } = req.body;

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
console.log("login user called");
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};



//adminlogin



// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', // Use Ethereal mail server
    port: 587,
    auth: {
        user: 'alysa.feest23@ethereal.email',
        pass: 'dfgTSTgaP4h1AnJtre'
    }
});


const otpStore = {};

// Simulate sending OTP
let generatedOtp = null;



exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Email: ", email);
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: 'User not found' });
        }

        // console.log("User found:", user);
        // console.log("Provided password:", password);
        // console.log("Stored hashed password:", user.password);

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("Incorrect password");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.role !== 'admin') {
            console.log("Not an admin");
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Generate OTP (6-digit random number)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = otp; // Store OTP for verification


        // const otp = crypto.randomInt(100000, 999999).toString();
        // otpStore[email] = otp;
        // console.log(`OTP for user ${email} is ${otp}`);

        
        // Send OTP via email
        const mailOptions = {
            from: 'alysa.feest23@ethereal.email', 
            to: email, // Recipient address
            subject: 'OTP Verification',
            text: `Your OTP for login is ${otp}.`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent:', info.messageId);

        res.status(200).json({ message: 'OTP sent to email.', otpSent: true });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};





exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!otpStore[email] || otpStore[email] !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Clear the OTP from storage after verification
        delete otpStore[email];

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create JWT token for user
        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};





// exports.verifyOtp = async (req, res) => {
//     const { email, otp } = req.body;

//     try {
//         if (otp !== generatedOtp) {
//             return res.status(400).json({ message: 'Invalid OTP' });
//         }

//         const user = await User.findOne({ email });
//         const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };


//admin signup

exports.registerAdmin = async (req, res) => {
    const { firstName, lastName, nic, email, password, phoneNumberCountryCode, phoneNumberRest, address } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Original Password:", password);
        console.log("Hashed Password during registration:", hashedPassword);


        const newUser = new User({
            firstName,
            lastName,
            nic,
            email,
            password,
            phoneNumber: {
                countryCode: phoneNumberCountryCode,
                number: phoneNumberRest
            },
            address,
            role: 'admin'  // Set role to 'admin'
        });

        const savedUser = await newUser.save();
        console.log("admin saved");

        const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



//   admin profile

exports.updateAdminProfile = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, address } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phoneNumber.countryCode = phoneNumber.countryCode || user.phoneNumber.countryCode;
        user.phoneNumber.number = phoneNumber.number || user.phoneNumber.number;
        user.address = address || user.address;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Change Admin Password
exports.changeAdminPassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });

    }
};