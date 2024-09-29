const express = require('express');
const { getExercises, modifyExercise } = require('./exercisesService');


const router = express.Router();

// GET exercises
router.get('/getWorkouts', async (req, res) => {
  try {
    const exercises = await getExercises();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/modifyWorkout', async (req, res) => {
  try {
    modifyExercise(req.body);
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});