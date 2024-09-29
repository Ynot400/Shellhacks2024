import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from '@react-native-community/slider';

const VerticalSlider = () => {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.verticalSlider} // Apply rotation and styling
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={(val) => setValue(val)}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#8B9CB6"
      />
      <Text style={styles.text}>Value: {value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  verticalSlider: {
    width: 300,   // This width will become the height due to rotation
    height: 40,   // This height will become the width due to rotation
    transform: [{ rotate: '270deg' }],  // Rotate the slider to make it vertical
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default VerticalSlider;
