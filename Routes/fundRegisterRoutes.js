const express = require('express');
const router = express.Router();
const { registerFundraiser, loginUser} = require('../Controllers/fundRegisterController');


router.post('/', registerFundraiser);
router.post('/', loginUser);


module.exports = router;
