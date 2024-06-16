const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
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

    try {
        const userId = req.user.id; // Assuming JWT middleware sets req.user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify current password
        if (currentPassword) {
            const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ success: false, message: 'Incorrect current password' });
            }

            // Hash the new password if provided and passwords match
            if (newPassword && newPassword === retypePassword) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(newPassword, salt);
            } else {
                return res.status(400).json({ success: false, message: 'New password and retype password do not match' });
            }
        }

        // Update user profile fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.address = address || user.address;
        user.phoneNumber.countryCode = phoneNumberCountryCode || user.phoneNumber.countryCode;
        user.phoneNumber.number = phoneNumberRest || user.phoneNumber.number;

        const updatedUser = await user.save(); // Save updated user document to database

        res.status(200).json({ success: true, message: 'User profile updated successfully', updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

exports.getCurrentUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming JWT middleware sets req.user with the user ID
        const user = await User.findById(userId).select('-password'); // Exclude password from response

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching current user profile:", error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};