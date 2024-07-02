const express = require('express');
const router = express.Router();
const { createOrUpdateProject } = require('../Controllers/createProjectController'); // Ensure the correct path to the controller

// Define the route for creating or updating a project
router.post('/', createOrUpdateProject);

module.exports = router;
