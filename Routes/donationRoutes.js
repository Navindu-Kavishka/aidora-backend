const express = require('express');
const router = express.Router();
const donationController = require('../Controllers/donationController');
const auth = require("../middleware/auth");

router.post('/', auth, donationController.donate);

module.exports = router;
