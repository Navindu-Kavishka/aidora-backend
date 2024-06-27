const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require("../Middleware/auth");
const role = require('../middleware/role');

router.post('/', auth, role('founder'), projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id/status', auth, role('admin'), projectController.updateProjectStatus);

module.exports = router;
