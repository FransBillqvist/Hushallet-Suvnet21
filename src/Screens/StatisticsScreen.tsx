import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import ChorePieChart from '../Components/ChorePieChart';
import { filterCurrentWeek } from '../Components/filterChoreHistory';
import { PieChart } from '../Components/PieChart';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppSelector } from '../Store/store';

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

export interface PieData {
  choreTitle?: string;
  name: string;
  contribution: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'StatisticsScreen'>;

export default function StatisticsScreen({ navigation }: Props) {
  const totalData: PieData[] = [];
  const everyPieData: JSX.Element[] = [];

  const household = useAppSelector((state) => state.household.singleHousehold);
  const profilesInHousehold = useAppSelector((state) =>
    state.profile.profiles.filter((pro) => pro.householdId == household?.id),
  );
  const choresInHousehold = useAppSelector((state) => state.chore.chores);
  const choreHistories = useAppSelector((state) => state.choreHistory.choresHistory);

  const choreHistoryForCurrentWeek = filterCurrentWeek(choreHistories);

  profilesInHousehold.forEach((pro) => {
    let contribution = 0;
    const choresDoneByProfile = choreHistoryForCurrentWeek.filter((cH) => cH.profileId == pro.id);
    if (choresDoneByProfile.length > 0) {
      choresDoneByProfile.forEach((cH) => {
        contribution += choresInHousehold.find((chore) => chore.id == cH.choreId)?.demanding || 0;
      });
    }

    totalData.push({
      name: pro.avatar,
      contribution: contribution,
      color: setColor(pro.avatar) || '',
      legendFontColor: 'transparent',
      legendFontSize: 30,
    });
  });

  choresInHousehold.forEach((choreHousehold) => {
    const choreHasBeenDone = choreHistoryForCurrentWeek.filter(
      (cH) => cH.choreId == choreHousehold.id,
    );
    if (choreHasBeenDone.length > 0) {
      const choreData: PieData[] = [];
      choreHasBeenDone.forEach((choreDone) => {
        const avatar = profilesInHousehold.find((pro) => pro.id == choreDone.profileId)?.avatar;
        choreData.push({
          choreTitle: choreHousehold.name,
          name: avatar || '',
          contribution: 1,
          color: setColor(avatar || '') || '',
          legendFontColor: 'transparent',
          legendFontSize: 30,
        });
      });
      everyPieData.push(PieChart(choreData));
    }
  });

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeRight={() => navigation.navigate('HomeScreen')}
    >
      <View style={styles.container}>
        <Text variant='headlineMedium'>Nuvarande vecka</Text>
        <ChorePieChart width={500} height={300} hasLegend data={totalData} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{everyPieData}</View>
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
