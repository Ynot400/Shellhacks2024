const { getExercises, modifyExercise } = require('./exercisesService'); // Import service functions


// GET exercises
router.get('/getWorkouts', async (req, res) => {
  try {
    // Call the service function and pass necessary data
    const exercises = await getExercises(req.query.current_day); // Assume you're passing a query parameter 'current_day'
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST to modify an exercise
router.post('/modifyWorkout', async (req, res) => {
  try {
    await modifyExercise(req.body); // Pass the request body to the service
    res.status(200).json({ message: 'Workout modified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // Export the router
