import React, { useContext } from "react";
import { View, Text, Button} from "react-native";
import { UserContext } from '../UserContext';
import * as Progress from 'react-native-progress';
import { useTheme } from '../ColorContext';
export default function Home() {
  const { theme } = useTheme();
  const { xp, setXP, level, setLevel, body_weight, setWeight, current_week, setWeek } = useContext(UserContext);
  const handleIncrease = () => {
    if (xp >= 0.9) {
      setXP(Number((xp - 0.9).toFixed(1)))
      setLevel(level + 1)
    } else {
      setXP(Number((xp + (0.1)).toFixed(1)));
    }
  };
  return (
    
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text>Current Level: {level}</Text>
      <Progress.Bar progress={xp} width={300} height={10} color={theme.accent} />
      <Button color={theme.primary} title="Start Today's Workout" onPress={handleIncrease} />
    </View>
  );
}
