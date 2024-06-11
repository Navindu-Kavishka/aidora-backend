// backend/index.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
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
    app.use('/api/fundregisters', require('./Routes/fundRegisterRoutes'));
    app.use('/api/fundlogins',require('./Routes/fundLoginRoutes'))
} catch (err) {
    console.error('Error while setting up routes:', err);
}

// Connect to MongoDB and start the server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
