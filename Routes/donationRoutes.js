const express = require('express');
const router = express.Router();
const donationController = require('../Controllers/donationController');
const auth = require("../Middleware/auth");

//router.post('/', auth, donationController.donate);

router.get('/', authMiddleware, getDonors);
router.put('/:id', authMiddleware, updateDonor);
router.delete('/:id', authMiddleware, deleteDonor);

module.exports = router;
