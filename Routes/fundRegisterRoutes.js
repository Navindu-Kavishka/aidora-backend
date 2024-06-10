const express = require('express');
const { fundregisterUser } = require('../controllers/fundRegisterController');
const router = express.Router();

router.post('/frregister', fundregisterUser);

module.exports = router;
