import React, { useState } from "react";
import { View, Image } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // To navigate back to CurrentWeek

const exercises = [
  {
    name: "Squats",
    image:
      "https://static.vecteezy.com/system/resources/previews/006/417/702/original/man-character-doing-dumbbell-squats-exercise-flat-illustration-isolated-on-different-layers-free-vector.jpg", // URL to exercise image
    weight: "50kg",
    reps: 10,
    sets: 3,
  },
  {
    name: "Bench Press",
    image:
      "https://static.vecteezy.com/system/resources/previews/006/417/702/original/man-character-doing-dumbbell-squats-exercise-flat-illustration-isolated-on-different-layers-free-vector.jpg",
    weight: "70kg",
    reps: 8,
    sets: 4,
  },
  // Add more exercises here
];

export default function Lesson() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const navigation = useNavigation(); // To navigate between screens

  const handleComplete = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Navigate back to CurrentWeek once the lesson is completed
      navigation.navigate("CurrentWeek");
    }
  };

  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        {currentExercise.name}
      </Text>
      <Card>
        {/* Display exercise image */}
        <Card.Cover
          source={{ uri: currentExercise.image }}
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
        onPress={handleComplete}
      >
        {isLastExercise ? "Complete Lesson" : "Complete Exercise"}
      </Button>
    </View>
  );
}
