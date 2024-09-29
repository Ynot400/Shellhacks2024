require('dotenv').config(); // Load environment variables


// Define the port
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
