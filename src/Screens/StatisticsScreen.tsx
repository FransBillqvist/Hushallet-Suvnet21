import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import ChorePieChart from '../Components/ChorePieChart';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { selectHistoryByPeriod } from '../Store/choreHistorySlice';
import { useAppSelector } from '../Store/store';

export interface PieData {
  name: string;
  contribution: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export interface ChorePieData {
  choreTitle: string;
  pieData: PieData[];
}



export default function StatisticsScreen() {
  // const { totalData, everyPieData } = useAppSelector(selectHistoryByPeriod(route.params.period));
  const { totalData, everyPieData } = useAppSelector(selectHistoryByPeriod('currentWeek'));
  return (
      <View style={styles.container}>
        <Text variant='headlineMedium'>Nuvarande vecka</Text>
        <ChorePieChart width={500} height={300} hasLegend data={totalData} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {everyPieData.map((data) => (
            <View key={data.choreTitle} style={styles.container}>
              <Text>{data.choreTitle}</Text>
              <ChorePieChart width={200} height={150} hasLegend={false} data={data.pieData} />
            </View>
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
