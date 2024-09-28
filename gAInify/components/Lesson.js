import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Lesson({ route, navigation }) {
  const { lessonId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are in Lesson {lessonId}</Text>
      <Button title="Complete Lesson" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
