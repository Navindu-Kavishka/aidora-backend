const express = require('express');
const router = express.Router();
const { loginUser } = require('../Controllers/fundLoginController');

// Route for user login
router.post('/', loginUser);

module.exports = router;
