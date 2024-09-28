import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home1 from "./components/Home";
import CurrentWeek from "./components/CurrentWeek";
import Trainer from "./components/Trainer";
import React from "react";
import Lesson from "./components/Lesson";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* <Text>Hello World</Text> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home1} />
        <Stack.Screen name="CurrentWeek" component={CurrentWeek} />
        <Stack.Screen name="Trainer" component={Trainer} />
        <Stack.Screen name="Lesson" component={Lesson} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
