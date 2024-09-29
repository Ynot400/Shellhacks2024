import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { UserContext } from '../UserContext';
import * as Progress from 'react-native-progress';
import { useTheme } from '../ColorContext';
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { theme } = useTheme();
  const { xp, setXP, level, setLevel } = useContext(UserContext);
  const navigation = useNavigation();

  const handleIncrease = () => {
    navigation.navigate("CurrentWeek");
    if (xp >= 0.9) {
      setXP(Number((xp - 0.9).toFixed(1)));
      setLevel(level + 1);
    } else {
      setXP(Number((xp + 0.25).toFixed(1)));
    }
  };

  // Get the screen width to calculate 90% width dynamically
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.primary }]}>Welcome to Gainify</Text>
      
      <Text style={[styles.levelText, { color: theme.primary }]}>Current Level: {level}</Text>
      
      <View style={styles.progressBarContainer}>
        <Progress.Bar 
          progress={xp} 
          width={screenWidth * 0.9} 
          height={15} 
          color={theme.accent} 
          borderWidth={1} 
          borderColor={theme.primary} 
        />
      </View>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleIncrease}>
        <Text style={styles.buttonText}>Start Today's Workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
  },
  levelText: {
    fontSize: 18,
    marginVertical: 10,
  },
  progressBarContainer: {
    marginVertical: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
