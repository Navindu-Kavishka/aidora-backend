// backend/index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const FundRegister = require('./Models/FundRegister'); // Adjust the path as necessary

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
try {
    app.use('/api/users', require('./routes/userRoutes'));
    app.use('/api/projects', require('./routes/projectRoutes'));
    app.use('/api/donations', require('./routes/donationRoutes'));
    app.use('/api/fundregisters', require('./routes/fundRegisterRoutes'));
    app.use('/api/fundregisters', require('./routes/fundLoginRoutes'));
    app.use('/api/createprojects', require('./Routes/createProjectRoutes'));
} catch (err) {
    console.error('Error while setting up routes:', err);
}

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


const startServer = async () => {
    try {
        await connectDB();
        await dropIndexIfNeeded(); // Ensure this function is called only when needed

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit with failure
    }
};


startServer();
