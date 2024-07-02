const express = require('express');
const { loginAdmin, verifyOtp, adminLogin } = require("../Controllers/adminController");
const { authMiddleware, adminMiddleware } = require('../Middleware/authMiddleware');
const router = express.Router();


//router.post('/login', loginUser);
// router.post('/login', adminLogin);
// router.post('/verify-otp', verifyOtp);


// Protect all routes below this middleware
// router.use(authMiddleware);
// router.use(adminMiddleware);

router.get('/donors', (req, res) => {
    // Logic to get all donors
});


module.exports = router;
