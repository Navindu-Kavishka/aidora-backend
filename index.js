const express = require('express');
const connectDB = require('./Config/db'); // Ensure the correct path
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(bodyParser.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use('/api/projects', require('./Routes/projectRoutes'));
app.use('/api/donations', require('./Routes/donationRoutes'));

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
