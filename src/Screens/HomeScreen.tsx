import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, IconButton, Portal, Text, TextInput } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { Household } from '../Data/household';
import { RootStackParamList } from '../Navigation/RootNavigator';
import {
  emptyChoreHistoryState,
  getChoreHistoryFromDbByProfileIds,
} from '../Store/choreHistorySlice';
import { getASingleChore, selectChoresObject } from '../Store/choreSlice';
import { editHouseholdName, selectActiveHousehold } from '../Store/householdSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chores = useAppSelector((state) => state.chore);
  const activeHouseHold = useAppSelector((state) => state.household.singleHousehold);
  const activeProfile = useAppSelector((state) => state.profile.currentProfile);
  const profiles = useAppSelector((state) => state.profile.profiles);
  const choreData = useAppSelector(selectChoresObject());

  const [originalHouseHold, editedHousehold] = React.useState<Household>({
    id: activeHouseHold?.id || '',
    name: activeHouseHold?.name || '',
    code: activeHouseHold?.code || '',
  });
  const [houseModalVisible, setHouseModalVisible] = React.useState(false);
  const showHouseModal = () => setHouseModalVisible(true);
  const hideHouseModal = () => setHouseModalVisible(false);

  const handleHouseholdChange = (key: string, value: string | number) => {
    editedHousehold((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView>
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={async () => {
          await dispatch(emptyChoreHistoryState());
          dispatch(
            await getChoreHistoryFromDbByProfileIds(
              profiles.filter((pro) => pro.householdId == activeHouseHold?.id),
            ),
          );
          navigation.navigate('StatisticsScreen');
        }}
      >
        <View>
          {chores.chores.map((chore) => (
            <View key={chore.id}>
              <Pressable
                onPress={async () => {
                  await dispatch(selectActiveHousehold(activeHouseHold?.id || ''))
                    .unwrap()
                    .then(async () => {
                      await dispatch(getASingleChore(chore.id));
                      navigation.navigate('DetailScreen');
                    });
                }}
              >
                <ChoreCard chore={chore}>
                  <Text>{chore.name}</Text>
                  <View style={{ alignItems: 'center' }}>
                    {choreData
                      .filter((cD) => cD.id === chore.id)
                      .map((cD) => (
                        <Text key={cD.key}>{cD.avatarOrDays}</Text>
                      ))}
                    {activeProfile.role == 'owner' ? (
                      <IconButton
                        icon='pencil-outline'
                        onPress={() => navigation.navigate('EditChoreScreen', { id: chore.id })}
                      ></IconButton>
                    ) : (
                      <></>
                    )}
                  </View>
                </ChoreCard>
              </Pressable>
            </View>
          ))}
        </View>

        {activeProfile.role == 'owner' ? (
          <View style={styles.smallButtonContainer}>
            <View style={styles.smallButtonPosition}>
              <BigButton
                theme={getTheme('dark')}
                onPress={() => navigation.navigate('ChoreScreen')}
                icon='plus-circle-outline'
                style={{ maxWidth: 150 }}
              >
                Ny syssla
              </BigButton>
              <Portal>
                <Dialog
                  visible={houseModalVisible}
                  onDismiss={hideHouseModal}
                  style={{
                    maxHeight: 200,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Dialog.Title>Byt hushållsnamn</Dialog.Title>
                  <Dialog.Content style={{ maxHeight: 150, marginBottom: 10 }}>
                    <TextInput
                      placeholder={originalHouseHold.name}
                      value={originalHouseHold.name}
                      onChangeText={(text: string) => handleHouseholdChange('name', text)}
                      style={styles.inputTextField}
                    />
                    <Dialog.Actions style={{ marginTop: 10, padding: 0 }}>
                      <BigButton
                        theme={getTheme('dark')}
                        onPress={async () => (
                          setHouseModalVisible(false),
                          await dispatch(editHouseholdName(originalHouseHold)),
                          await dispatch(selectActiveHousehold(activeHouseHold?.id || ''))
                        )}
                      >
                        Spara
                      </BigButton>
                    </Dialog.Actions>
                  </Dialog.Content>
                </Dialog>
              </Portal>
              <BigButton
                style={{ maxWidth: 150, marginLeft: 10 }}
                theme={getTheme('dark')}
                onPress={showHouseModal}
                icon='pencil-outline'
              >
                Hushållsnamn
              </BigButton>
            </View>
          </View>
        ) : (
          <></>
        )}
      </GestureRecognizer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 10,
  },
  smallButtonContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  smallButtonPosition: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  inputTextField: {
    marginTop: 20,
    borderRadius: 7,
    fontSize: 15,
    borderWidth: 1,
  },
});
