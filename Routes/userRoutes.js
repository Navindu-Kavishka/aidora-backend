const express = require('express');
const { registerUser, loginUser, loginAdmin, verifyOtp, registerAdmin, updateAdminProfile, changeAdminPassword } = require("../controllers/userController");
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/register-admin', registerAdmin);
router.post('/admin/login', loginAdmin);
router.post('/admin/verify-otp', verifyOtp);
router.put('/admin/update-profile', updateAdminProfile);
router.put('/admin/change-password', changeAdminPassword);

module.exports = router;
