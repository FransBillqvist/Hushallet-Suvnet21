import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ChorePieChart from '../Components/ChorePieChart';
import TotalChorePieChart from '../Components/TotalChorePieChart';
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.totalChartContainer}>
          <TotalChorePieChart width={500} height={250} hasLegend={true} data={totalData} />
        </View>
        <View style={styles.smallPiechartContainer}>
          {everyPieData.map((data) => (
            <View key={data.choreTitle} style={styles.smallPiechart}>
              <ChorePieChart width={140} height={100} hasLegend={false} data={data.pieData} />
              <Text>{data.choreTitle}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  totalChartContainer: {
    paddingBottom: 30,
  },
  smallPiechart: {
    alignItems: 'center',
    maxWidth: 100,
    padding: 10,
  },
  smallPiechartContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
