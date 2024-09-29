import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"; // Use Material Design Tabs
import Home1 from "./components/Home";
import CurrentWeek from "./components/CurrentWeek";
import Trainer from "./components/Trainer";
import Settings from "./components/Settings";
import { UserProvider } from "./UserContext";
import { ColorProvider, useTheme } from "./ColorContext";

const Tab = createMaterialBottomTabNavigator();

function AppNavigator() {
  const { theme } = useTheme(); // Use theme from ColorContext

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: theme.background }} // Set tab bar background color
      activeColor={theme.accent} // Active tab text color
      inactiveColor={theme.text} // Inactive tab text color
      labeled={true} // Ensure tabs have labels (text)
      shifting={false} // Disable shifting animation
      sceneAnimationEnabled={false} // Disable scene animation for material tabs
      screenOptions={{
        tabBarIcon: () => null, // Remove default icons
        tabBarLabelStyle: {
          fontSize: 14, // Adjust text size for better layout
          paddingBottom: 5, // Add padding to prevent text overlap
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home1}
        options={{ tabBarLabel: "Home" }} // Text label only
      />
      <Tab.Screen
        name="CurrentWeek"
        component={CurrentWeek}
        options={{ tabBarLabel: "Current Week" }}
      />
      <Tab.Screen
        name="Trainer"
        component={Trainer}
        options={{ tabBarLabel: "Trainer" }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: "Settings" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ColorProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ColorProvider>
    </UserProvider>
  );
}
