import React from 'react';
import { Image, View, Text } from 'react-native';
import { Asset } from 'expo-asset';

const DynamicImage = ({ imageName }) => {

  const images = {
    "Back Extensions": require('../images/Back Extensions.png'),
    "Bench": require('../images/Bench.png'),
    "Bicep Curl": require('../images/Bicep Curl.png'),
    "Biking": require('../images/Biking.png'),
    "Cable Fly": require('../images/Cable Fly.png'),
    "Chest Dips": require('../images/Chest Dips.png'),
    "Crunches": require('../images/Crunches.png'),
    "Deadlift": require('../images/Deadlift.png'),
    "Decline Bench Press": require('../images/Decline Bench Press.png'),
    "Decline Dumbbell Press": require('../images/Decline Dumbbell Press.png'),
    "Donkey Calf Raises": require('../images/Donkey Calf Raises.png'),
    "Dumbbell Calf Raises": require('../images/Dumbbell Calf Raises.png'),
    "Dumbbell Fly": require('../images/Dumbbell Fly.png'),
    "Dumbbell Rows": require('../images/Dumbbell Rows.png'),
    "Face Pulls": require('../images/Face Pulls.png'),
    "Front Raise": require('../images/Front Raise.png'),
    "Glute-Ham Raise": require('../images/Glute-Ham Raise.png'),
    "Good Mornings": require('../images/Good Mornings.png'),
    "Hammer Curls": require('../images/Hammer Curls.png'),
    "Incline Barbell": require('../images/Incline Barbell.png'),
    "Incline Bench Situps": require('../images/Incline Bench Situps.png'),
    "Incline Bench": require('../images/Incline Bench.png'),
    "Incline Cable Flyes": require('../images/Incline Cable Flyes.png'),
    "Lat Pulldowns": require('../images/Lat Pulldowns.png'),
    "Lateral Raises": require('../images/Lateral Raises.png'),
    "Leg Curl Machine": require('../images/Leg Curl Machine.png'),
    "Leg Extension Machine": require('../images/Leg Extension Machine.png'),
    "Leg Raises": require('../images/Leg Raises.png'),
    "Lunges": require('../images/Lunges.png'),
    "Pec Deck Machine": require('../images/Pec Deck Machine.png'),
    "Pull-Ups": require('../images/Pull-Ups.png'),
    "Rear Delt Fly (Dumbbell)": require('../images/Rear Delt Fly (Dumbbell).png'),
    "Reverse Curls": require('../images/Reverse Curls.png'),
    "Reverse Pec Deck Fly": require('../images/Reverse Pec Deck Fly.png'),
    "Romanian Deadlifts": require('../images/Romanian Deadlifts.png'),
    "Rowing Machine": require('../images/Rowing Machine.png'),
    "Seated Calf Raises": require('../images/Seated Calf Raises.png'),
    "Shoulder Press": require('../images/Shoulder Press.png'),
    "Squats": require('../images/Squats.png'),
    "Treadmill": require('../images/Treadmill.png'),
    "Tricep Dips": require('../images/Tricep Dips.png'),
    "Tricep Overhead": require('../images/Tricep Overhead.png'),
    "Tricep Pushdown": require('../images/Tricep Pushdown.png')
  };

  console.log(currentExercise.image);
  console.log(" this is the image name: ", imageName);
  


  return (
        // Display the image using its dynamically generated URI
        <Image source={images[imageName]} style={{ width: 100, height: 100 }} />
)};

export default DynamicImage;
