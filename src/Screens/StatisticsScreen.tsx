import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChorePieChart from '../Components/ChorePieChart';
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
  const totalDataToDecimal = totalData.map((data) => {
    return {
      ...data,
      contribution: data.contribution / 10,
    };
  });
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <ChorePieChart width={400} height={200} hasLegend data={totalDataToDecimal} />
          <View style={styles.smallPiechartContainer}>
            {everyPieData.map((data) => (
              <View key={data.choreTitle} style={styles.smallPiechart}>
                <Text>{data.choreTitle}</Text>
                <ChorePieChart width={140} height={100} hasLegend={false} data={data.pieData} />
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  smallPiechart: {
    alignItems: 'center',
    maxWidth: 100,
  },
  smallPiechartContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
