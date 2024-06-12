const express = require('express');
const connectDB = require('./Config/db'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors({
    origin: 'http://localhost:5173',   // frontend URL
    credentials: true,
  }));
  

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
// app.use('/api/projects', require('./Routes/projectRoutes'));
// app.use('/api/donations', require('./Routes/donationRoutes'));
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/donors", require("./Routes/donorRoutes"));
 //app.use("/api/admin", require('./Routes/adminRoutes.js'));

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
