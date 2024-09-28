
export default function Home() { 
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Current Week"
        onPress={() => navigation.navigate('CurrentWeek')}
      />
      <Button
        title="Trainer"
        onPress={() => navigation.navigate('Trainer')}
      />
    </View>
  );
}