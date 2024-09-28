import React from "react";
import { View, Text, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Current Week"
        onPress={() => navigation.navigate("CurrentWeek")}
      />
      <Button title="Trainer" onPress={() => navigation.navigate("Trainer")} />
    </View>
  );
}
