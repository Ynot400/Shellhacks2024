require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const cors = require('cors'); // Import the cors package
const { getExercises, modifyExercise } = require('./Exercises/exercisesService'); // Import service functions
const { personalTrainer } = require('./PersonalTrainer'); // Import personal trainer function

// Define the port
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
const app = express(); // Initialize Express

// Use CORS middleware
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// GET exercises
app.get('/getWorkouts', async (req, res) => {
  try {
    // Call the service function and pass necessary data
    const exercises = await getExercises(req.query.current_day); // Pass query parameter 'current_day'
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST to modify an exercise
app.post('/modifyWorkout', async (req, res) => {
  try {
    await modifyExercise(req.body); // Pass the request body to the service
    res.status(200).json({ message: 'Workout modified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/askTrainer', async (req, res) => {
  try {
    const response = await personalTrainer(req.body.message);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
