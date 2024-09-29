import React, { useContext } from "react";
import { View, Text, Button} from "react-native";
import { UserContext } from '../UserContext';
import * as Progress from 'react-native-progress';
export default function Home() {
  const { xp, setXP, level, setLevel, body_weight, setWeight, current_week, setWeek } = useContext(UserContext);
  
  return (
    
    <View>
      <Text>Current Level: {level}</Text>
      <Progress.Bar progress={xp} width={300} height={10} color={'#3ccf63'} />
      <Button title="Start Today's Workout" onPress={handleIncrease} />
    </View>
  );
}
