import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ChorePieChart from '../Components/ChorePieChart';
import { RootStackParamList } from '../Navigation/RootNavigator';

function setColor(name: string) {
  if (name === '🦊') {
    return 'red';
  } else if (name === '🐳') {
    return 'lightblue';
  } else if (name === '🐷') {
    return 'pink';
  } else if (name === '🐥') {
    return 'yellow';
  } else if (name === '🐸') {
    return '#F4D03F';
  } else if (name === '🐬') {
    return '#4D4F4F';
  } else if (name === '🐙') {
    return '#FF1493';
  } else if (name === '🦄') {
    return '#F1DEE6';
  }
}

const testData = [
  {
    name: '🦊',
    contribution: 1,
    color: setColor('🦊'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
  },
  {
    name: '🐳',
    contribution: 1,
    color: setColor('🐳'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
  },
  {
    name: '🐷',
    contribution: 1,
    color: setColor('🐷'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
  },
  {
    name: '🐥',
    contribution: 1,
    color: setColor('🐥'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
  },
  {
    name: '🐸',
    contribution: 1,
    color: setColor('🐸'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
  },
  {
    name: '🐬',
    contribution: 1,
    color: setColor('🐬'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
  },
  {
    name: '🐙',
    contribution: 1,
    color: setColor('🐙'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
  },
  {
    name: '🦄',
    contribution: 1,
    color: setColor('🦄'),
    legendFontColor: 'transparent',
    legendFontSize: 40,
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
