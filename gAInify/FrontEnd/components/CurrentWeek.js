import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
  CheckBox,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import VerticalSlider from "../verticalSlider";
import { Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useTheme } from "../ColorContext";
import { UserContext } from "../UserContext";

const screenWidth = Dimensions.get("window").width;

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
  "Back Extensions": require("../images/Back Extensions.png"),
  Bench: require("../images/Bench.png"),
  "Bicep Curl": require("../images/Bicep Curl.png"),
  Biking: require("../images/Biking.png"),
  "Cable Fly": require("../images/Cable Fly.png"),
  "Chest Dips": require("../images/Chest Dips.png"),
  Crunches: require("../images/Crunches.png"),
  Deadlift: require("../images/Deadlift.png"),
  "Decline Bench Press": require("../images/Decline Bench Press.png"),
  "Decline Dumbbell Press": require("../images/Decline Dumbbell Press.png"),
  "Donkey Calf Raises": require("../images/Donkey Calf Raises.png"),
  "Dumbbell Calf Raises": require("../images/Dumbbell Calf Raises.png"),
  "Dumbbell Fly": require("../images/Dumbbell Fly.png"),
  "Dumbbell Rows": require("../images/Dumbbell Rows.png"),
  "Face Pulls": require("../images/Face Pulls.png"),
  "Front Raise": require("../images/Front Raise.png"),
  "Glute-Ham Raise": require("../images/Glute-Ham Raise.png"),
  "Good Mornings": require("../images/Good Mornings.png"),
  "Hammer Curls": require("../images/Hammer Curls.png"),
  "Incline Barbell": require("../images/Incline Barbell.png"),
  "Incline Bench Situps": require("../images/Incline Bench Situps.png"),
  "Incline Bench": require("../images/Incline Bench.png"),
  "Incline Cable Flyes": require("../images/Incline Cable Flyes.png"),
  "Lat Pulldowns": require("../images/Lat Pulldowns.png"),
  "Lateral Raises": require("../images/Lateral Raises.png"),
  "Leg Curl Machine": require("../images/Leg Curl Machine.png"),
  "Leg Extension Machine": require("../images/Leg Extension Machine.png"),
  "Leg Raises": require("../images/Leg Raises.png"),
  "Lunges": require("../images/Lunges.png"),
  "Pec Deck Machine": require("../images/Pec Deck Machine.png"),
  "Pull-Ups": require("../images/Pull-Ups.png"),
  "Rear Delt Fly (Dumbbell)": require("../images/Rear Delt Fly (Dumbbell).png"),
  "Reverse Curls": require("../images/Reverse Curls.png"),
  "Reverse Pec Deck Fly": require("../images/Reverse Pec Deck Fly.png"),
  "Romanian Deadlifts": require("../images/Romanian Deadlifts.png"),
  "Rowing Machine": require("../images/Rowing Machine.png"),
  "Seated Calf Raises": require("../images/Seated Calf Raises.png"),
  "Shoulder Press": require("../images/Shoulder Press.png"),
  Squats: require("../images/Squats.png"),
  Treadmill: require("../images/Treadmill.png"),
  "Tricep Dips": require("../images/Tricep Dips.png"),
  "Tricep Overhead": require("../images/Tricep Overhead.png"),
  "Tricep Pushdown": require("../images/Tricep Pushdown.png"),
  daylock: require("../images/daylock.png"),
};

export default function CurrentWeek() {
  const { xp, setXP, level, setLevel } = useContext(UserContext);
  const [workoutStatus, setWorkoutStatus] = useState(workouts); // Track workout completion status
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null); // Track current workout
  const [currentStep, setCurrentStep] = useState(0); // Track current step in workout
  const [exercises, setExercises] = useState([]); // State for fetched exercises
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [sliderSets, setSliderSets] = useState(3);
  const [sliderReps, setSliderReps] = useState(8);
  const [exerciseUncomfortable, setExerciseUncomfortable] = useState(false);
  const [easeLevel, setEaseLevel] = useState(0);
  const [xpGained, setXpGained] = useState({ reps: 0, sets: 0 });
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleIncrease = () => {
    if (xp >= 0.9) {
      setXP(Number((xp - 0.9).toFixed(1)));
      setLevel(level + 1);
    } else {
      setXP(Number((xp + 0.1).toFixed(1)));
    }
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getWorkouts", {
          params: { current_day },
        });
        setExercises(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [current_day]);

  const handlePress = (workoutId) => {
    setCurrentWorkoutId(workoutId);
    setModalVisible(true);

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

    const newXp = {
      reps: sliderReps * 5, // Example XP calculation
      sets: sliderSets * 10,
    };
    setXpGained(newXp);
  };

  const handleComplete = () => {
    //send exercise with axios. probably a post from axios.
    setModalVisible(false);
    setCurrentStep(0);
    setCurrentWorkoutId(null);
    current_day += 1;
    if (current_day > 3) {
      current_day = 0;
    }
    handleIncrease();
    navigation.navigate("CurrentWeek");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const currentExercise = exercises[currentStep];
  const isLastExercise = currentStep === exercises.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {workoutStatus.map((workout, index) => {
        const isUnlocked = index === 0 || workoutStatus[index - 1].completed;
        return (
          <TouchableOpacity
            key={workout.id}
            style={[
              styles.circle,
              {
                backgroundColor: workout.completed
                  ? theme.primary
                  : theme.secondary,
                top: index * 100,
                left: screenWidth / 2 + Math.sin(index * 1.5) * 100,
              },
            ]}
            onPress={isUnlocked ? () => handlePress(workout.id) : null}
            activeOpacity={isUnlocked ? 0.7 : 1}
            disabled={!isUnlocked} // Disable touch if not unlocked
          >
            {isUnlocked ? (
              <Text style={styles.text}>{workout.title}</Text>
            ) : (
              <Image
                source={images["daylock"]}
                style={styles.lockedImage} // Locked image style
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        );
      })}

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
                {currentExercise.Weight && currentExercise.Weight[0] > 0
                  ? `Weight: ${currentExercise.Weight[0]} LBs`
                  : currentExercise.Time
                  ? `Time: ${currentExercise.Time}`
                  : "Time: 10 minutes"}
              </Text>
              <Text style={{ fontSize: 20 }}>Reps: 8-12</Text>
              <Text style={{ fontSize: 20 }}>Sets: 3</Text>
            </Card.Content>
          </Card>

          {/* XP Display */}
          <View style={styles.xpContainer}>
            <Text style={{ fontSize: 18 }}>XP Gained:</Text>
            <Text>avg reps: {xpGained.reps}xp</Text>
            <Text>sets: {xpGained.sets}xp</Text>
          </View>

          {/* Slider for sets */}
          <Text>Number of sets</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={sliderSets}
            onValueChange={setSliderSets}
            color={theme.accent}
          />

          {/* Slider for reps */}
          <Text>Average number of reps</Text>
          <Slider
            minimumValue={5}
            maximumValue={20}
            step={1}
            value={sliderReps}
            onValueChange={setSliderReps}
            color={theme.primary}
          />

          {/* Checkbox for discomfort */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={exerciseUncomfortable}
              onValueChange={setExerciseUncomfortable}
            />
            <Text>Was this exercise uncomfortable?</Text>
          </View>

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
    textAlign: "center", // Center text horizontally
  },
  lockedImage: {
    width: 80,
    height: 80, // Ensure the image fits within the circle
    borderRadius: 40,
  },
  cardCover: {
    width: 300,
    height: 300, //Need to change to right value
  },
});
