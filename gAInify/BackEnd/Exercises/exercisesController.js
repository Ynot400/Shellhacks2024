const express = require('express');
const { getExercises } = require('./exercisesService');

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
