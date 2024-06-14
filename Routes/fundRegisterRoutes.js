const express = require('express');
const router = express.Router();
const {registerFundraiser,loginUser,updateProfile,getProfile} = require('../Controllers/fundRegisterController');

router.post('/', registerFundraiser);
router.post('/', loginUser);
router.put('/', updateProfile);
router.get('/', getProfile);

module.exports = router;
