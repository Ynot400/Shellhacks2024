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
        exercises.push({ collection_name: collectionName, id: doc.id, ...doc.data() }); // Include document ID
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
            exercises.push({ collection_name: collection, id: doc.id, ...doc.data() }); // Include document ID
        });
    }


    return exercises;

} catch (error) {
    console.error('Error fetching exercises:', error);
    throw error; // Re-throw the error after logging it 
}
}

// Function to modify the weight or minutes based on difficulty for a list of exercises
async function modifyExercise(exerciseDataList) {
    try {
        for (const exerciseData of exerciseDataList) {
            const { collectionName, id, difficultyRating } = exerciseData;

            // Reference to the specific document in the collection
            const exerciseRef = db.collection(collectionName).doc(id);
            
            const exerciseDoc = await exerciseRef.get();
            if (!exerciseDoc.exists) {
                console.log(`No such exercise document found for ${id} in ${collectionName}!`);
                continue;  // Skip this exercise and move to the next
            }

            const exercise = exerciseDoc.data();

            // If difficulty is under 7, adjust weight or minutes
            if (difficultyRating < 7) {
                if (exercise.Weight && Array.isArray(exercise.Weight)) {
                    // If the exercise has a weight, increase the last weight by 5 pounds
                    const lastWeight = exercise.Weight[exercise.Weight.length - 1] || 0;
                    const newWeight = lastWeight + 5;
                    
                    // Update the document with the new weight
                    await exerciseRef.update({
                        Weight: admin.firestore.FieldValue.arrayUnion(newWeight)
                    });
                    console.log(`Increased weight for exercise ${id} by 5 pounds.`);
                } else if (exercise.Minutes) {
                    // If the exercise has minutes, increase the minutes by 1
                    const lastMinutes = exercise.Minutes[exercise.Minutes.length - 1] || 0;
                    const newMinutes = lastMinutes + 1;
                    await exerciseRef.update({
                        Minutes: admin.firestore.FieldValue.arrayUnion(newMinutes)
                    });
                    console.log(`Increased time for exercise ${id} by 1 minute.`);
                } else {
                    console.log(`No weight or minutes found for exercise ${id}.`);
                }
            }
        }
    } catch (error) {
        console.error('Error adjusting exercise difficulty:', error);
    }
}


// Function to update primary exercises based on user feedback for a list of exercises
async function updatePrimaryExercise(exerciseDataList) {
    try {
        for (const exerciseData of exerciseDataList) {
            const { collectionName, id, uncomfortable } = exerciseData;

            // Reference to the current exercise in the provided collection
            const exerciseRef = db.collection(collectionName).doc(id);

            // If the exercise is marked as uncomfortable, update the Primary flag to false
            if (uncomfortable) {
                await exerciseRef.update({
                    Primary: false
                });

                console.log(`Marked exercise ${id} as not primary.`);

                // Query to find another exercise in the same collection that is not marked as primary
                // and exclude the current exercise that was marked as uncomfortable
                const exercisesSnapshot = await db.collection(collectionName)
                    .where('Primary', '==', false)  // Look for exercises not already marked as Primary
                    .where(admin.firestore.FieldPath.documentId(), '!=', id)  // Exclude the current exercise
                    .limit(1)  // Limit to one result to make the new primary
                    .get();

                if (!exercisesSnapshot.empty) {
                    // Get the first exercise document
                    const newPrimaryExercise = exercisesSnapshot.docs[0];
                    
                    // Update that exercise to be the new primary
                    await db.collection(collectionName).doc(newPrimaryExercise.id).update({
                        Primary: true
                    });

                    console.log(`Marked exercise ${newPrimaryExercise.id} as primary.`);
                } else {
                    console.log(`No other exercises found to mark as primary in ${collectionName}.`);
                }
            }
        }
    } catch (error) {
        console.error('Error updating primary exercise:', error);
    }
}

// // Modify the weight
// async function modifyExercise() {
//   // Reference to the specific document (Dumbbell Calf Raises under Legs (Calves))
//   const exerciseRef = db.collection('Legs (Calves)').doc('Dumbbell Calf Raises');
  
//   // Update the weight of the exercise
//   await exerciseRef.update({
//     Weight: admin.firestore.FieldValue.arrayUnion(50)  // Add new weight, e.g., 50
//   });
  
//   console.log('Exercise updated successfully');
// }





module.exports = { getExercises, modifyExercise, updatePrimaryExercise };

