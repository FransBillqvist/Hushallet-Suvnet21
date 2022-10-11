import { StyleSheet, Text, View } from 'react-native';

export default function HouseHoldScreen() {
  return (
    <View style={styles.container}>
      <Text>Household screen</Text>
      <Text>Create household</Text>
      <Text>Join household</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
