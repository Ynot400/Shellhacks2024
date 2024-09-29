// const e = require('express');
const { db } = require('../firebaseNodeJS');

async function getExercises(day) {
  try {
    const muscleGroups = ['chest', 'back', 'legs', 'arms'];
    const absOrCardio = ['abs', 'cardio'];
    const randomBinary = Math.floor(Math.random() * 2);
    const exercises = [];
    let snapshot;

    // Fetch either an ab or cardio workout
    const workoutType = absOrCardio[randomBinary];
    const collectionName = workoutType === 'abs' ? 'Abs (Abs)' : 'Cardio (Running)';
    
    snapshot = await db.collection(collectionName).where('Primary', '==', true).get();
    snapshot.forEach(doc => {
        exercises.push({ id: doc.id, ...doc.data() }); // Include document ID
    });

    console.log("Day: ", day);
    
    // Map of muscle groups to their respective collection names
    const muscleGroupCollections = {
        chest: [
            'Chest (Isolated Chest)',
            'Chest (Upper Chest)',
            'Chest (Lower Chest)',
        ],
        back: [
            'Back (Lats)',
            'Back (Lower Back)',
            'Back (Rear Delt)',
        ],
        legs: [
            'Legs (Calves)',
            'Legs (Quads)',
            'Legs (Hamstrings)',
        ],
        arms: [
            'Arms (Biceps)',
            'Arms (Triceps)',
            'Arms (Shoulders)',
        ],
    };

    // Fetch workouts based on the selected muscle group
    const selectedMuscleGroup = muscleGroups[day];
    const collectionsToFetch = muscleGroupCollections[selectedMuscleGroup];

    if (!collectionsToFetch) {
        throw new Error('Invalid workout type');
    }

    // Iterate through collections and fetch data
    for (const collection of collectionsToFetch) {
        snapshot = await db.collection(collection).where('Primary', '==', true).get();
        snapshot.forEach(doc => {
            exercises.push({ id: doc.id, ...doc.data() }); // Include document ID
        });
    }


    return exercises;

} catch (error) {
    console.error('Error fetching exercises:', error);
    throw error; // Re-throw the error after logging it 
}
}


// Modify the weight
async function modifyExercise() {
  // Reference to the specific document (Dumbbell Calf Raises under Legs (Calves))
  const exerciseRef = db.collection('Legs (Calves)').doc('Dumbbell Calf Raises');
  
  // Update the weight of the exercise
  await exerciseRef.update({
    Weight: admin.firestore.FieldValue.arrayUnion(50)  // Add new weight, e.g., 50
  });
  
  console.log('Exercise updated successfully');
}





module.exports = { getExercises, modifyExercise };

