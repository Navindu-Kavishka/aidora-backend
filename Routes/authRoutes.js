const express = require('express');
const { adminLogin, verifyAdmin } = require('../Controllers/authController');
const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/admin/verify', verifyAdmin);

module.exports = router;
