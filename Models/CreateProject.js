const mongoose = require('mongoose');

const createProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectInfo: {
    type: String,
    required: true,
  },
  estimatedValue: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Create',
    enum: ['Create', 'Submit for Approval', 'Verified'],
  },
});

module.exports = mongoose.model('CreateProject', createProjectSchema);
