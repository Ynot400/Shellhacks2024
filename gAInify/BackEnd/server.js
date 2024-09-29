require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const app = express(); // Initialize Express

// Define the port
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
