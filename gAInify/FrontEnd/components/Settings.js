import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from '../ColorContext';
import { UserContext } from '../UserContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme(); // Assuming toggleTheme is available in the context
  const { body_weight, setWeight, goal, setGoal } = useContext(UserContext); // Adding goal context if needed

  const [currentWeight, setCurrentWeight] = useState(body_weight || ''); // Track weight input
  const [selectedGoal, setSelectedGoal] = useState('Gain Muscle'); // Default goal set to 'Gain Muscle'

  const handleToggleTheme = () => {
    toggleTheme(); // Toggle between dark and light themes
  };

  const handleGoalChange = (newGoal) => {
    setSelectedGoal(newGoal); // Set user goal to either "Gain Muscle" or "Lose Weight"
    setGoal(newGoal); // Update the goal in context if needed
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Settings Header */}
      <Text style={[styles.header, { color: theme.primary }]}>Settings</Text>

      {/* Toggle Theme Button */}
      <TouchableOpacity style={[styles.toggleButton, { backgroundColor: theme.primary }]} onPress={handleToggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>

      {/* Current Weight Text Box */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: theme.primary }]}>Current Weight</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.accent }]}
          keyboardType="numeric"
          value={currentWeight.toString()}
          onChangeText={(text) => setCurrentWeight(text)}
        />
      </View>

      {/* Gain Muscle / Lose Weight Toggle Buttons */}
      <View style={styles.goalButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.goalButton,
            {
              backgroundColor: selectedGoal === 'Gain Muscle' ? theme.accent : theme.primary,
            },
          ]}
          onPress={() => handleGoalChange('Gain Muscle')}
        >
          <Text style={styles.buttonText}>Gain Muscle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.goalButton,
            {
              backgroundColor: selectedGoal === 'Lose Weight' ? theme.accent : theme.primary,
            },
          ]}
          onPress={() => handleGoalChange('Lose Weight')}
        >
          <Text style={styles.buttonText}>Lose Weight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  toggleButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  goalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  goalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
