import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import Axios

// Get device width to help position elements
const screenWidth = Dimensions.get("window").width;

// Dummy workout data
const workouts = [
  { id: 1, title: "Chest Workout", completed: false },
  { id: 2, title: "Back Workout", completed: false },
  { id: 3, title: "Leg Workout", completed: false },
  { id: 4, title: "Arm Workout", completed: false },
];

current_day = 0;
reps = [8, 12];
sets = 3;



export default function CurrentWeek() {
  const [workoutStatus, setWorkoutStatus] = useState(workouts); // Track workout completion status
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null); // Track current workout
  const [currentStep, setCurrentStep] = useState(0); // Track current step in workout
  const [exercises, setExercises] = useState([]); // State for fetched exercises
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch exercises from the backend
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getWorkouts", {
          params: { current_day },
        });
        console.log(response.data); // Check what you're getting
        setExercises(response.data);
       

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Function to dynamically require images
  const getImageSource = (imageName) => {
    try {
      let image = require(`./images/${imageName}.png`); // Adjust the path as necessary
      return image;
    } catch (error) {
      console.error("Image not found:", error);
      return null; // Return a default image or null
    }
  };

  const handlePress = (workoutId) => {
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
    current_day += 1;
    navigation.navigate("CurrentWeek"); // Navigate back to Home screen or desired screen
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

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
              top: index * 100,
              left: screenWidth / 2 + Math.sin(index * 1.5) * 100,
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
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {currentExercise.id}
          </Text>
          <Card>
            {currentExercise.image && (
              <Card.Cover
                source={getImageSource(currentExercise.image)} // Get the image source dynamically
                style={{ width: "100%", height: 300 }}
              />
            )}
            <Card.Content>
              <Text style={{ marginTop: 10, fontSize: 20 }}>
                Weight: {currentExercise.Weight || "N/A"}
              </Text>
              <Text style={{ fontSize: 20 }}>
                Reps: 8-12
              </Text>
              <Text style={{ fontSize: 20 }}>Sets: 3</Text>
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
