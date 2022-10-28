import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ChorePieChart from '../Components/ChorePieChart';
import { Chore } from '../Data/chore';
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

//------------------------TEST DATA--------------------------
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
  id: '3',
  name: 'Laga mat',
  description: 'Laga mat',
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
  id: '2',
  userId: '2',
  name: 'Anna',
  avatar: '🐷',
  role: 'member',
  householdId: '1',
  choreList: [choreOne, choreThree],
};

const profileThree: Profile = {
  id: '3',
  userId: '3',
  name: 'Liz',
  avatar: '🐥',
  role: 'member',
  householdId: '1',
  choreList: [choreOne, choreTwo, choreThree],
};

//-------------------INDIVIDUAL TOTAL TEST DATA-------------------------
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

//-------------------INDIVIDUAL TEST DATA-------------------------

const choreOneData = [
  {
    name: getProfileAvatar(profileOne),
    contribution: 1,
    color: setColor(getProfileAvatar(profileOne)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
  {
    name: getProfileAvatar(profileThree),
    contribution: 1,
    color: setColor(getProfileAvatar(profileThree)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
];

const choreTwoData = [
  {
    name: getProfileAvatar(profileOne),
    contribution: 1,
    color: setColor(getProfileAvatar(profileOne)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
  {
    name: getProfileAvatar(profileTwo),
    contribution: 1,
    color: setColor(getProfileAvatar(profileTwo)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
  {
    name: getProfileAvatar(profileThree),
    contribution: 1,
    color: setColor(getProfileAvatar(profileThree)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
];

const choreThreeData = [
  {
    name: getProfileAvatar(profileTwo),
    contribution: 1,
    color: setColor(getProfileAvatar(profileTwo)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
  {
    name: getProfileAvatar(profileThree),
    contribution: 1,
    color: setColor(getProfileAvatar(profileThree)),
    legendFontColor: 'transparent',
    legendFontSize: 30,
  },
];

interface TotalData {
  name: string;
  contribution: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'StatisticsScreen'>;

export default function StatisticsScreen({ navigation }: Props) {
  const totalData: TotalData[] = [];

  const household = useAppSelector((state) => state.household.singleHousehold);
  const profilesInHousehold = useAppSelector((state) =>
    state.profile.profiles.filter((pro) => pro.householdId == household?.id),
  );
  const choresInHousehold = useAppSelector((state) => state.chore.chores);
  const choreHistories = useAppSelector((state) => state.choreHistory.choresHistory);

  profilesInHousehold.forEach((pro) => {
    let contribution = 0;
    // const contributed = choreHistories.find((cH) => cH.profileId == pro.id);
    const choresDoneByProfile = choreHistories.filter((cH) => cH.profileId == pro.id);
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

  return (
    <View style={styles.container}>
      <Text>Nuvarande vecka</Text>
      {choreHistories.map((cH) => (
        <>
          <Text key={cH.id}>
            {cH.date} + {cH.profileId} + {cH.id}
          </Text>
        </>
      ))}
      {/* <Text>Pil-vänster FÖRRA VECKAN pil-höger </Text>
      <Text>Piechart: TOTALT</Text>
      <Text>Display: Alla sysslors pie charts </Text> */}
      <ChorePieChart width={500} height={300} hasLegend data={totalData} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ alignItems: 'center' }}>
          <ChorePieChart width={120} height={100} hasLegend={false} data={choreOneData} />
          <Text>{choreOne.name}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ChorePieChart width={120} height={100} hasLegend={false} data={choreTwoData} />
          <Text>{choreTwo.name}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ChorePieChart width={120} height={100} hasLegend={false} data={choreThreeData} />
          <Text>{choreThree.name}</Text>
        </View>
      </View>
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
