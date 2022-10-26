import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ChorePieChart from '../Components/ChorePieChart';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { Chore } from '../Data/chore';

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

//TODO: Konvertera så att data hämtas från firebase
function getTotalDemanding(profile: Profile) {
  let totalDemanding = 0;
  profile.choreList.forEach((chore) => {
    totalDemanding += chore.demanding;
  });
  return totalDemanding;
}

function getProfileAvatar(profile: Profile) {
  return profile.avatar;
}

//------------------------TEST DATA-------------------------
interface Profile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: string;
  householdId: string;
  choreList: Chore[];
}

const choreOne: Chore = {
  id: '1',
  name: 'Torka Golv',
  description: 'Torka golv',
  demanding: 2,
  frequency: 2,
  householdId: '1',
};
const choreTwo: Chore = {
  id: '2',
  name: 'Diska',
  description: 'Diska',
  demanding: 2,
  frequency: 2,
  householdId: '1',
};
const choreThree: Chore = {
  id: '2',
  name: 'Diska',
  description: 'Diska',
  demanding: 2,
  frequency: 2,
  householdId: '1',
};

const profileOne: Profile = {
  id: '1',
  userId: '1',
  name: 'Bengt',
  avatar: '🦊',
  role: 'member',
  householdId: '1',
  choreList: [choreOne, choreTwo],
};
const profileTwo: Profile = {
  id: '1',
  userId: '1',
  name: 'Anna',
  avatar: '🐷',
  role: 'member',
  householdId: '1',
  choreList: [choreOne, choreThree],
};

const profileThree: Profile = {
  id: '1',
  userId: '1',
  name: 'Liz',
  avatar: '🐥',
  role: 'member',
  householdId: '1',
  choreList: [choreOne, choreTwo, choreThree],
};

//-------------------TOTAL TEST DATA-------------------------
const totalData = [
  {
    name: getProfileAvatar(profileOne),
    contribution: getTotalDemanding(profileOne),
    color: setColor(getProfileAvatar(profileOne)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
  {
    name: getProfileAvatar(profileTwo),
    contribution: getTotalDemanding(profileTwo),
    color: setColor(getProfileAvatar(profileTwo)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
  {
    name: getProfileAvatar(profileThree),
    contribution: getTotalDemanding(profileThree),
    color: setColor(getProfileAvatar(profileThree)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'StatisticsScreen'>;

export default function StatisticsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* <Text>Pil-vänster FÖRRA VECKAN pil-höger </Text>
      <Text>Piechart: TOTALT</Text>
      <Text>Display: Alla sysslors pie charts </Text> */}
      <ChorePieChart hasLegend data={totalData} />
      <View>{/* <ChorePieChar data={}></ChorePieChar> */}</View>

      <Button onPress={() => navigation.navigate('RegisterScreen')}>Register</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
