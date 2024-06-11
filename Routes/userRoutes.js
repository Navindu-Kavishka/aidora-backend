const express = require('express');
const { registerUser, loginUser, getCurrentUserProfile, updateUserProfile } = require("../Controllers/userController");
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authMiddleware ,loginUser);
router.put('/update', authMiddleware ,updateUserProfile);
router.get('/profile', authMiddleware ,getCurrentUserProfile);

module.exports = router;
