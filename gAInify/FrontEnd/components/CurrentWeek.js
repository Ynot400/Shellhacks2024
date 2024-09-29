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
import DynamicImage from './DynamicImages'; // Import the component
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

const images = {
  "Back Extensions": require('../images/Back Extensions.png'),
  "Bench": require('../images/Bench.png'),
  "Bicep Curl": require('../images/Bicep Curl.png'),
  "Biking": require('../images/Biking.png'),
  "Cable Fly": require('../images/Cable Fly.png'),
  "Chest Dips": require('../images/Chest Dips.png'),
  "Crunches": require('../images/Crunches.png'),
  "Deadlift": require('../images/Deadlift.png'),
  "Decline Bench Press": require('../images/Decline Bench Press.png'),
  "Decline Dumbbell Press": require('../images/Decline Dumbbell Press.png'),
  "Donkey Calf Raises": require('../images/Donkey Calf Raises.png'),
  "Dumbbell Calf Raises": require('../images/Dumbbell Calf Raises.png'),
  "Dumbbell Fly": require('../images/Dumbbell Fly.png'),
  "Dumbbell Rows": require('../images/Dumbbell Rows.png'),
  "Face Pulls": require('../images/Face Pulls.png'),
  "Front Raise": require('../images/Front Raise.png'),
  "Glute-Ham Raise": require('../images/Glute-Ham Raise.png'),
  "Good Mornings": require('../images/Good Mornings.png'),
  "Hammer Curls": require('../images/Hammer Curls.png'),
  "Incline Barbell": require('../images/Incline Barbell.png'),
  "Incline Bench Situps": require('../images/Incline Bench Situps.png'),
  "Incline Bench": require('../images/Incline Bench.png'),
  "Incline Cable Flyes": require('../images/Incline Cable Flyes.png'),
  "Lat Pulldowns": require('../images/Lat Pulldowns.png'),
  "Lateral Raises": require('../images/Lateral Raises.png'),
  "Leg Curl Machine": require('../images/Leg Curl Machine.png'),
  "Leg Extension Machine": require('../images/Leg Extension Machine.png'),
  "Leg Raises": require('../images/Leg Raises.png'),
  "Lunges": require('../images/Lunges.png'),
  "Pec Deck Machine": require('../images/Pec Deck Machine.png'),
  "Pull-Ups": require('../images/Pull-Ups.png'),
  "Rear Delt Fly (Dumbbell)": require('../images/Rear Delt Fly (Dumbbell).png'),
  "Reverse Curls": require('../images/Reverse Curls.png'),
  "Reverse Pec Deck Fly": require('../images/Reverse Pec Deck Fly.png'),
  "Romanian Deadlifts": require('../images/Romanian Deadlifts.png'),
  "Rowing Machine": require('../images/Rowing Machine.png'),
  "Seated Calf Raises": require('../images/Seated Calf Raises.png'),
  "Shoulder Press": require('../images/Shoulder Press.png'),
  "Squats": require('../images/Squats.png'),
  "Treadmill": require('../images/Treadmill.png'),
  "Tricep Dips": require('../images/Tricep Dips.png'),
  "Tricep Overhead": require('../images/Tricep Overhead.png'),
  "Tricep Pushdown": require('../images/Tricep Pushdown.png')
};

const handleIncrease = () => {
  if (xp >= 0.9) {
    setXP(Number((xp - 0.9).toFixed(1)))
    setLevel(level + 1)
  } else {
    setXP(Number((xp + (0.1)).toFixed(1)));
  }
};

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
        // setImages(respone.data.id: )
       

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

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
    handleIncrease();
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
            {currentExercise.id && images[currentExercise.id] && (
              <Card.Cover
                source={images[currentExercise.id]}
                style={styles.cardCover}
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
  cardCover: {
    width: 300,
    height: 300,
  },
});
