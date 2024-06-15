const express = require('express');
const connectDB = require('./config/db'); // Assuming this file contains your database connection logic
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const FundRegister = require('./Models/FundRegister'); // Adjust the path as necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
try {
  app.use('/api/users', require('./routes/userRoutes')); // Example route for users
  app.use('/api/projects', require('./routes/projectRoutes')); // Example route for projects
  app.use('/api/donations', require('./routes/donationRoutes')); // Example route for donations
  app.use('/api/fundregisters', require('./Routes/fundRegisterRoutes')); // Route for fund registers
  app.use('/api/createprojects', require('./routes/createProjectRoutes')); // Example route for creating projects
} catch (err) {
  console.error('Error while setting up routes:', err);
}

// Function to drop index if needed (example implementation)
const dropIndexIfNeeded = async () => {
  try {
    console.log('Dropping unique index on userno...');
    await FundRegister.collection.dropIndex('userno_1');
    console.log('Index dropped successfully');
  } catch (err) {
    if (err.code === 27 && err.codeName === 'IndexNotFound') {
      console.log('Index userno_1 not found, skipping drop operation.');
    } else {
      console.error('Error dropping index:', err);
    }
  }
};

// Function to start the server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB using Mongoose or your preferred method
    await dropIndexIfNeeded(); // Ensure this function is called only when needed

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit with failure
  }
};

startServer();
