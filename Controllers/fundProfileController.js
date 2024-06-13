
const FundProfile = require('../models/FundProfile');

// Function to register a new fund profile
exports.registerFundProfile = async (req, res) => {
  try {
    const { firstName, lastName, companyName, email, address, phoneNumber, countryCode, password } = req.body;
    const fundProfile = new FundProfile({ firstName, lastName, companyName, email, address, phoneNumber, countryCode, password });
    await fundProfile.save();
    res.status(201).json(fundProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get a fund profile by ID
exports.getFundProfileById = async (req, res) => {
  try {
    const fundProfile = await FundProfile.findById(req.params.id);
    if (!fundProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(fundProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to update a fund profile
exports.updateFundProfile = async (req, res) => {
  try {
    const { firstName, lastName, address, phoneNumber, countryCode, currentPassword, newPassword } = req.body;

    const fundProfile = await FundProfile.findById(req.params.id);
    if (!fundProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Check current password
    if (fundProfile.password !== currentPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    fundProfile.firstName = firstName || fundProfile.firstName;
    fundProfile.lastName = lastName || fundProfile.lastName;
    fundProfile.address = address || fundProfile.address;
    fundProfile.phoneNumber = phoneNumber || fundProfile.phoneNumber;
    fundProfile.countryCode = countryCode || fundProfile.countryCode;
    if (newPassword) {
      fundProfile.password = newPassword;
    }

    await fundProfile.save();
    res.json(fundProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
