import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import HugeButton from '../Components/Buttons/HugeButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { ChoreHistory } from '../Data/choreHistory';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { addChoreHistoryToDb } from '../Store/choreHistorySlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;

export default function DetailScreen(navigator: Props) {
  const chores = useAppSelector((state) => state.chore.singleChore);
  const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
  const profileId = useAppSelector((state) => state.profile.currentProfile.id);
  const dispatch = useAppDispatch();

  return (
    <ScrollView>
      <View>
        <ChoreCard>
          <Text>{chores.name}</Text>
          <Text>{chores.frequency}</Text>
        </ChoreCard>
        <ChoreCard>
          <Text>{chores.description}</Text>
        </ChoreCard>
        <ChoreCard>
          <Text>Energivärde:</Text>
          <Text>{chores.demanding}</Text>
        </ChoreCard>
        <HugeButton
          icon='plus-circle-outline'
          theme={getTheme('light')}
          onPress={() => {
            const isDone: ChoreHistory = {
              id: '-' + nanoId(),
              choreId: chores.id,
              profileId: profileId,
              date: new Date().toISOString(),
            };
            dispatch(addChoreHistoryToDb(isDone));
            navigator.navigation.navigate('HomeScreen');
          }}
          style={{ alignSelf: 'center' }}
        >
          Markera som klar
        </HugeButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
