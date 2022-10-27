import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getTheme } from '../Components/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'DevStartScreen'>;

export default function DevStartScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('ChoreScreen');
        }}
      >
        <Text>Chore</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('CreateScreen');
        }}
      >
        <Text>Create</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('DetailScreen');
        }}
      >
        <Text>Detail</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('HomeScreen');
        }}
      >
        <Text>Home</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('ManagerScreen');
        }}
      >
        <Text>Manager</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('ProfileScreen');
        }}
      >
        <Text>Profile</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('RegisterScreen');
        }}
      >
        <Text>Register</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
          navigation.navigate('StartScreen');
        }}
      >
        <Text>Start</Text>
      </BigButton>
      <BigButton
        theme={getTheme('dark')}
        onPress={function (): void {
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
});
