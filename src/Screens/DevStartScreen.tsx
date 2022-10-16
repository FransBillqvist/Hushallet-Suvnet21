import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import BigButton from '../Components/Buttons/BigButton';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DevStartScreen'>;

export default function DevStartScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('ChoreScreen');
        }}
      >
        <Text>Chore</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('CreateScreen');
        }}
      >
        <Text>Create</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('DetailScreen');
        }}
      >
        <Text>Detail</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('HomeScreen');
        }}
      >
        <Text>Home</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('ManagerScreen');
        }}
      >
        <Text>Manager</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('ProfileScreen');
        }}
      >
        <Text>Profile</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('RegisterScreen');
        }}
      >
        <Text>Register</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('StartScreen');
        }}
      >
        <Text>Start</Text>
      </BigButton>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('StatisticsScreen');
        }}
      >
        <Text>Statistics</Text>
      </BigButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 300,
    marginTop: 45,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 1000,
    paddingVertical: 16,
    elevation: 4,
    minWidth: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
