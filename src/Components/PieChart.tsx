import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { PieData } from '../Screens/StatisticsScreen';
import ChorePieChart from './ChorePieChart';

export function PieChart(choreData: PieData[]) {
  return (
    <View style={{ alignItems: 'center' }} key={choreData[0].choreTitle}>
      <ChorePieChart width={120} height={100} hasLegend={false} data={choreData} />
      <Text>{choreData[0].choreTitle}</Text>
    </View>
  );
}
