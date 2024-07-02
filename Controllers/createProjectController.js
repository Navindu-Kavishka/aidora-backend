const Project = require('../Models/CreateProject');

// Create or update a project
exports.createOrUpdateProject = async (req, res) => {
  const { projectName, projectInfo, estimatedValue } = req.body;

  try {
    // Check if a project with the same name already exists
    let project = await Project.findOne({ projectName });

    if (project) {
      // If project exists, update its estimated value and optionally project information
      project.estimatedValue = estimatedValue;
      if (projectInfo) project.projectInfo = projectInfo; // Update projectInfo if provided

      await project.save();
      return res.json({ success: true, message: 'Project updated successfully', project });
    } else {
      // If project does not exist, create a new one
      project = new Project({
        projectName,
        projectInfo,
        estimatedValue,
        status: 'Submit for Approval', // Change status upon creation
      });

      await project.save();
      return res.json({ success: true, message: 'Project created successfully', project });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
