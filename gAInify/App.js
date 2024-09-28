import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home1 from "./components/Home";
import CurrentWeek from "./components/CurrentWeek";
import Trainer from "./components/Trainer";
import React from "react";
import Settings from "./components/Settings";
const Stack = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home1} />
        <Stack.Screen name="CurrentWeek" component={CurrentWeek} />
        <Stack.Screen name="Trainer" component={Trainer} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
