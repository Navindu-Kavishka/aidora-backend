// routes/createProjectRoutes.js
const express = require('express');
const router = express.Router();
const {createProject} = require('../Controllers/createProjectController');

// POST /api/createprojects
router.post('/', createProject);

module.exports = router;
