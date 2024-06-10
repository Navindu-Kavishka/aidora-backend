const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const auth = require("../middleware/auth");

router.post('/', auth, donationController.donate);

module.exports = router;
