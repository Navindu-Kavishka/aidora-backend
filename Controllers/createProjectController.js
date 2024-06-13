const Project = require('../Models/CreateProject');

// Create a new project
exports.createProject = async (req, res) => {
  const { projectName, projectInfo, estimatedValue } = req.body;

  try {
    const newProject = new Project({
      projectName,
      projectInfo,
      estimatedValue,
      status: 'Submit for Approval', // Change status upon creation
    });

    await newProject.save();
    res.json({ success: true, message: 'Project created successfully', project: newProject });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
