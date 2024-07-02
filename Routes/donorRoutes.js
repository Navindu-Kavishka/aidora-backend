const express = require('express');
const { getDonors, updateDonor, deleteDonor } = require('../Controllers/donorController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.get('/', getDonors);

 //router.get('/', authMiddleware, getDonors);
 router.put('/:id', updateDonor);
 router.delete('/:id', deleteDonor);

module.exports = router;
