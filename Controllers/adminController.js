const Admin = require('../Models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const dotenv = require('dotenv');
dotenv.config();

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate OTP
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET,
      encoding: 'base32',
    });

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    // Temporarily store the OTP in the database (or in memory, e.g., Redis)
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 300000; // OTP expiry time: 5 minutes
    await admin.save();

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: 'Admin not found' });
  
      if (Date.now() > admin.otpExpiry) return res.status(400).json({ message: 'OTP expired' });
  
      if (admin.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
  
      // OTP is valid, generate JWT token
      const token = jwt.sign({ email: admin.email, id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ result: admin, token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  