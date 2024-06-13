

const express = require('express');
const router = express.Router();
const fundProfileController = require('../controllers/fundProfileController');

// Route for registering a new fund profile
router.post('/register', fundProfileController.registerFundProfile);

// Route for getting a fund profile by ID
router.get('/:id', fundProfileController.getFundProfileById);

// Route for updating a fund profile
router.put('/:id', fundProfileController.updateFundProfile);

module.exports = router;
