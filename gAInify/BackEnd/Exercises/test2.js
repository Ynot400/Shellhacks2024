const admin = require('firebase-admin');
const { db } = require('../firebaseNodeJS');  // Ensure this path is correct based on your project structure

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

// Example list of exercises to modify and update primary based on user feedback
const exercisesList = [
    {
        collectionName: 'Abs (Abs)',
        id: 'Crunches',
        difficultyRating: 6,  // This is less than 7, so we will adjust weight or minutes
        uncomfortable: true   // This exercise was uncomfortable
    },
    {
        collectionName: 'Legs (Calves)',
        id: 'Dumbbell Calf Raises',
        difficultyRating: 7,  // This is not less than 7, so we won't adjust weight or minutes
        uncomfortable: false  // This exercise was not uncomfortable
    }
    // Add more exercise objects as needed
];

// Main function to run both tasks sequentially
async function main() {
    // Call modifyExercise to adjust weight or minutes
    await modifyExercise(exercisesList);

    // Call updatePrimaryExercise with the same list
    await updatePrimaryExercise(exercisesList);
}

// Run the main function
main().catch(error => {
    console.error('Error running the main function:', error);
});
