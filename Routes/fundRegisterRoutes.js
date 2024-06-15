const express = require('express');
const router = express.Router();
const { registerFundraiser, loginUser, getProfile, updateProfile, updatePassword } = require('../Controllers/fundRegisterController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/register', registerFundraiser);
router.post('/', loginUser);
router.get('/profile/:id', authMiddleware, getProfile);
router.put('/profile/:id', authMiddleware, updateProfile);
router.put('/profile/:id/password', authMiddleware, updatePassword);

module.exports = router;
