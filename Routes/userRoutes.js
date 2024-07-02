const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const { registerUser, loginUser, loginAdmin, verifyOtp, registerAdmin, updateAdminProfile, changeAdminPassword, getCurrentUserProfile, updateUserProfile  } = require("../controllers/userController");
const router = express.Router();



router.post('/register-admin', registerAdmin);
router.post('/admin/login', loginAdmin);
router.post('/admin/verify-otp', verifyOtp);
router.put('/admin/update-profile', updateAdminProfile);
router.put('/admin/change-password', changeAdminPassword);



router.post('/register', registerUser);
router.post('/login', authMiddleware ,loginUser);
router.put('/update', authMiddleware ,updateUserProfile);
router.get('/profile', authMiddleware ,getCurrentUserProfile);


module.exports = router;
