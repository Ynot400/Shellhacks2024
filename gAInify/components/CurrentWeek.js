import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { Button, Card } from "react-native-paper"; // Assuming you're using react-native-paper for Card component
import { useNavigation } from "@react-navigation/native";

// Get device width to help position elements
const screenWidth = Dimensions.get("window").width;

// Dummy workout data
const workouts = [
  { id: 1, title: "Chest Workout", completed: false },
  { id: 2, title: "Back Workout", completed: false },
  { id: 3, title: "Leg Workout", completed: false },
  { id: 4, title: "Arm Workout", completed: false },
];


current_day = 1;
reps = [8,12];
sets = 3;





// Exercise data to be used in the modal
const exercises = [
  {
    name: "Deadlift",
    image: require("../images/squat.png"),
    weight: "135lb",
  },
  {
    name: "Bench Press",
    image: require("../images/incline.png"),
    weight: "70kg",
    reps: 8,
    sets: 4,
  },
  // Add more exercises as needed
];

export default function CurrentWeek() {
  const [workoutStatus, setWorkoutStatus] = useState(workouts); // Track workout completion status
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null); // Track current workout
  const [currentStep, setCurrentStep] = useState(0); // Track current step in workout

  const navigation = useNavigation();

  const handlePress = (workoutId) => {
    // Set the current workout and show the modal
    setCurrentWorkoutId(workoutId);
    setModalVisible(true);

    // Mark workout as complete after opening modal
    setWorkoutStatus((prevStatus) =>
      prevStatus.map((workout) =>
        workout.id === workoutId ? { ...workout, completed: true } : workout
      )
    );
  };

  const handleNext = () => {
    if (currentStep < exercises.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setModalVisible(false);
    setCurrentStep(0); // Reset to initial step
    setCurrentWorkoutId(null);
    navigation.navigate("Home"); // Navigate back to Home screen or desired screen
  };

  const currentExercise = exercises[currentStep];
  const isLastExercise = currentStep === exercises.length - 1;

  return (
    <View style={styles.container}>
      {workoutStatus.map((workout, index) => (
        <TouchableOpacity
          key={workout.id}
          style={[
            styles.circle,
            {
              backgroundColor: workout.completed ? "green" : "gray",
              top: index * 100, // Increase vertical spacing to avoid overlap
              left: screenWidth / 2 + Math.sin(index * 1.5) * 100, // Adjusting curve factor to avoid overlap
            },
          ]}
          onPress={() => handlePress(workout.id)}
        >
          <Text style={styles.text}>{workout.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Fullscreen Modal for workout steps */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false} // Setting transparent to false for full-screen
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {currentExercise.name}
          </Text>
          <Card>
            {/* Display exercise image */}
            <Card.Cover
              source={currentExercise.image}
              style={{ width: "100%", height: 300 }}
            />
            <Card.Content>
              <Text style={{ marginTop: 10, fontSize: 20 }}>
                Weight: {currentExercise.weight}
              </Text>
              <Text style={{ fontSize: 20 }}>Reps: {currentExercise.reps}</Text>
              <Text style={{ fontSize: 20 }}>Sets: {currentExercise.sets}</Text>
            </Card.Content>
          </Card>
          <Button
            style={{ marginTop: 20, fontSize: 20 }}
            mode="contained"
            onPress={isLastExercise ? handleComplete : handleNext}
          >
            {isLastExercise ? "Complete Workout" : "Next Exercise"}
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

