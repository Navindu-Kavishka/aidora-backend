const FundRegister = require('../Models/FundRegister');
const bcrypt = require('bcryptjs');

exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, companyName, address, countryCode, number, currentPassword, newPassword, retypePassword } = req.body;

  try {
    const userId = req.params.id;
    const user = await FundRegister.findById(userId);

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
    user.firstname = firstName || user.firstname;
    user.lastname = lastName || user.lastname;
    user.email = email || user.email;
    user.companyName = companyName || user.companyName;
    user.address = address || user.address;
    user.countryCode = countryCode || user.countryCode;
    user.number = number || user.number;

    const updatedUser = await user.save();

    res.status(200).json({ success: true, message: 'User profile updated successfully', updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

exports.getCurrentUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await FundRegister.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
