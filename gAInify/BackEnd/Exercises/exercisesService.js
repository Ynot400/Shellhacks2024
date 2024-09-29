// Switch Out Exercise
// exercise_modifier(list_of_objects)
// change the weights with the easy meter in the list of objects if easy meter is lower than 7
// swap the main exercise to alternate if pain == yes


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
  
  modifyExercise().catch(console.error);
