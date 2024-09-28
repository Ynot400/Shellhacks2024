import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Get device width to help position elements
const screenWidth = Dimensions.get("window").width;

// Dummy lesson data
const lessons = [
  { id: 1, title: "Lesson 1", completed: false },
  { id: 2, title: "Lesson 2", completed: false },
  { id: 3, title: "Lesson 3", completed: false },
  { id: 4, title: "Lesson 4", completed: false },
  { id: 5, title: "Lesson 5", completed: false },
];

export default function CurrentWeek() {
  const [lessonStatus, setLessonStatus] = useState(lessons); // Track lesson completion status
  const navigation = useNavigation();

  const handlePress = (lessonId) => {
    // Navigate to the lesson screen
    navigation.navigate("Lesson", { lessonId });

    // Mark lesson as complete after navigating
    setLessonStatus((prevStatus) =>
      prevStatus.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    );
  };

  return (
    <View style={styles.container}>
      {lessonStatus.map((lesson, index) => (
        <TouchableOpacity
          key={lesson.id}
          style={[
            styles.circle,
            {
              backgroundColor: lesson.completed ? "green" : "gray",
              top: index * 100, // Increase vertical spacing to avoid overlap
              left: screenWidth / 2 + Math.sin(index * 1.5) * 100, // Adjusting curve factor to avoid overlap
            },
          ]}
          onPress={() => handlePress(lesson.id)}
        >
          <Text style={styles.text}>{lesson.title}</Text>
        </TouchableOpacity>
      ))}
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
