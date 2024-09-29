require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const cors = require('cors'); // Import the cors package

// Define the port
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
const app = express(); // Initialize Express

// Use CORS middleware
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
