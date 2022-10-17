import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ChorePieChart from '../Components/ChorePieChart';
import { RootStackParamList } from '../Navigation/RootNavigator';

const testData = [
  {
    name: 'Kalle',
    contribution: 215,
    color: '#FF7E46',
    // legendFontColor: "#7F7F7F",
    // legendFontSize: 20,
  },
  {
    name: 'Olle',
    contribution: 215,
    color: '#FCD933',
    // legendFontColor: "#7F7F7F",
    // legendFontSize: 20,
  },
  {
    name: 'Anna',
    contribution: 215,
    color: '#CD5D6F',
    // legendFontColor: "#7F7F7F",
    // legendFontSize: 20,
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
      <Button title='Register' onPress={() => navigation.navigate('RegisterScreen')}></Button>
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
