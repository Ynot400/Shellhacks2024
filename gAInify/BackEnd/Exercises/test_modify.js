const admin = require('firebase-admin');
const { db } = require('../firebaseNodeJS');  // Ensure this path is correct based on your project structure

// Function to modify the weight of an exercise
async function modifyExercise() {
    try {
        // Reference to the specific document (Dumbbell Calf Raises under Legs (Calves))
        const exerciseRef = db.collection('Legs (Calves)').doc('Dumbbell Calf Raises');
        
        // Update the weight of the exercise
        await exerciseRef.update({
            Weight: admin.firestore.FieldValue.arrayUnion(500)  // Add new weight, e.g., 500
        });
        
        console.log('Exercise updated successfully');
    } catch (error) {
        console.error('Error updating exercise:', error);
    }
}

// Function to update primary exercises based on user feedback
async function updatePrimaryExercise(exerciseData) {
    try {
        const { collectionName, id, difficultyRating, uncomfortable } = exerciseData;

        // Reference to the current exercise in the provided collection
        const exerciseRef = db.collection(collectionName).doc(id);

        // If the exercise is marked as uncomfortable, update the Primary flag to false
        if (uncomfortable) {
            await exerciseRef.update({
                Primary: false
            });

            console.log(`Marked exercise ${id} as not primary.`);

            // Query to find another exercise in the same collection that is not marked as primary
            const exercisesSnapshot = await db.collection(collectionName)
                .where('Primary', '==', false)  // Look for exercises not already marked as Primary
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
                console.log('No other exercises found to mark as primary.');
            }
        }
    } catch (error) {
        console.error('Error updating primary exercise:', error);
    }
}

// Example data for modifyExercise
const exampleModifyData = {
    collectionName: 'Legs (Calves)',
    id: 'Dumbbell Calf Raises',
    difficultyRating: 6,  // Difficulty rating, just for reference
    uncomfortable: true   // Was the exercise uncomfortable? Set true for this example
};

// Main function to run both tasks sequentially
async function main() {
    try {
        // Call modifyExercise to update weight
        await modifyExercise();

        // Call updatePrimaryExercise with example data
        await updatePrimaryExercise(exampleModifyData);

        console.log('Both functions ran successfully.');
    } catch (error) {
        console.error('Error running the main function:', error);
    }
}

// Run the main function
main();
