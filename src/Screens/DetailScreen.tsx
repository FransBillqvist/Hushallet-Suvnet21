import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import HugeButton from '../Components/Buttons/HugeButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { ChoreHistory } from '../Data/choreHistory';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { addChoreHistoryToDb } from '../Store/choreHistorySlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;

export default function DetailScreen(navigator: Props) {
  const singleChore = useAppSelector((state) => state.chore.singleChore);
  const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
  const profileId = useAppSelector((state) => state.profile.currentProfile.id);
  const dispatch = useAppDispatch();
  const activeProfile = useAppSelector((state) => state.profile.currentProfile);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, marginBottom: 25 }}>
      <View style={styles.container}>
        <ChoreCard style={{ marginTop: 14 }}>
          <Text>{singleChore.name}</Text>
          <Text>Skall göras var {singleChore.frequency}:e dag</Text>
        </ChoreCard>
        <ChoreCard style={{ minHeight: 129 }}>
          <Text>{singleChore.description}</Text>
        </ChoreCard>
        <ChoreCard style={{ minHeight: 70 }}>
          <Text>Energivärde:</Text>
          <Text>{singleChore.demanding}</Text>
        </ChoreCard>
        <HugeButton
          icon='plus-circle-outline'
          theme={getTheme('light')}
          onPress={() => {
            const isDone: ChoreHistory = {
              id: '-' + nanoId(),
              choreId: singleChore.id,
              profileId: profileId,
              date: new Date().toISOString(),
            };
            dispatch(addChoreHistoryToDb(isDone));
            navigator.navigation.navigate('HomeScreen');
          }}
          style={{ alignSelf: 'center', marginTop: 10 }}
        >
          Markera som klar
        </HugeButton>
        <View style={styles.buttonContainer}>
          <View style={{ justifyContent: 'flex-end' }}>
            {activeProfile.role == 'owner' ? (
              <BigButton
                style={{ marginTop: 10, alignSelf: 'center' }}
                icon='pencil-outline'
                theme={getTheme('light')}
                onPress={() =>
                  navigator.navigation.navigate('EditChoreScreen', { id: singleChore.id })
                }
              >
                Redigera syssla
              </BigButton>
            ) : (
              <></>
            )}
          </View>
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});
