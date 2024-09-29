import React from "react";
import { Text, View, Button } from "react-native";
import { useTheme } from '../ColorContext';

export default function Settings() {
  const { theme, toggleTheme} = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Settings!</Text>
      <Button color={theme.primary} title="Toggle Color Theme" onPress={toggleTheme} />
    </View>
  );
}
