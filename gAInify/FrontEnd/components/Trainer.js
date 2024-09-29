import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function Trainer() {
  const [inquiry, setInquiry] = useState('');  // User inquiry state
  const [response, setResponse] = useState('');  // AI response state

  const handleSubmit = () => {
    if (!inquiry.trim()) {
      setResponse("Please enter a question.");
      return;
    }

    console.log("Sending request to backend:", inquiry);

    // Send the inquiry to the backend
    axios
      .post("http://localhost:3000/askTrainer", { message: inquiry })  // URL points to the backend
      .then((res) => {
        console.log("Response from backend:", res.data);
        setResponse(res.data.message);
      })
      .catch((err) => {
        console.error("Error from backend:", err.response ? err.response.data : err.message);
        setResponse("Error getting response from the trainer.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ask the AI Trainer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your question..."
        value={inquiry}
        onChangeText={setInquiry}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  response: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
