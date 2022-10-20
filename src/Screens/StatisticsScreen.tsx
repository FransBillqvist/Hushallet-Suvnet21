import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ChorePieChart from '../Components/ChorePieChart';
import { RootStackParamList } from '../Navigation/RootNavigator';

const testData = [
  {
    name: 'Kalle',
    contribution: 215,
    color: '#FF7E46',
  },
  {
    name: 'Olle',
    contribution: 215,
    color: '#FCD933',
  },
  {
    name: 'Anna',
    contribution: 215,
    color: '#CD5D6F',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'StatisticsScreen'>;

export default function StatisticsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Pil-vänster FÖRRA VECKAN pil-höger </Text>
      <Text>Piechart: TOTALT</Text>
      <Text>Display: Alla sysslors pie charts </Text>
      <ChorePieChart data={testData} />
      <Button onPress={() => navigation.navigate('RegisterScreen')}>Register</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
