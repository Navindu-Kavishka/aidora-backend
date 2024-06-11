// backend/routes/fundRegisterRoutes.js
const express = require('express');
const { registerFundraiser } = require('../Controllers/fundRegisterController');

const router = express.Router();

// Register a new fundraiser
router.post('/', registerFundraiser);

module.exports = router;
