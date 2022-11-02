import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import * as Clipboard from 'expo-clipboard';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, IconButton, Portal, Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { Household } from '../Data/household';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { TopTabsParamList } from '../Navigation/TopTabsNavigator';
import { getASingleChore, selectNewChoresObject } from '../Store/choreSlice';
import { editHouseholdName, selectActiveHousehold } from '../Store/householdSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<TopTabsParamList, 'TodayScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const activeHouseHold = useAppSelector((state) => state.household.singleHousehold);
  const activeProfile = useAppSelector((state) => state.profile.currentProfile);
  const choreData = useAppSelector(selectNewChoresObject());

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

  const copyToClipboard = () => {
    Clipboard.setStringAsync(activeHouseHold?.code || '');
  };

  return (
    <ScrollView>
      <View>
        {choreData.map((chore) => (
          <View key={chore.id}>
            <Pressable
              onPress={async () => {
                await dispatch(getASingleChore(chore.id));
                navigation.navigate('DetailScreen');
              }}
            >
              <ChoreCard chore={chore}>
                <Text>{chore.name}</Text>
                <View style={{ alignItems: 'center' }}>
                  {chore.avatar ? (
                    <Text key={chore.id}>{chore.avatar}</Text>
                  ) : (
                    <View
                      style={
                        chore.isOverdue
                          ? {
                              backgroundColor: '#FF0000',
                              borderRadius: 100,
                              width: 25,
                              height: 25,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }
                          : {}
                      }
                    >
                      <Text>{chore.daysPast}</Text>
                    </View>
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
                  maxHeight: 230,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              >
                <Dialog.Title style={{ alignSelf: 'center', paddingTop: 6 }}>
                  Byt hushållsnamn
                </Dialog.Title>
                <Dialog.Content style={{ maxHeight: 210, marginBottom: 1 }}>
                  <TextInput
                    placeholder={originalHouseHold.name}
                    value={originalHouseHold.name}
                    onChangeText={(text: string) => handleHouseholdChange('name', text)}
                    style={styles.inputTextField}
                  />
                  <View style={{ alignSelf: 'center' }}>
                    <Text style={{ fontSize: 22 }}>
                      {activeHouseHold?.code}
                      <IconButton
                        icon='content-copy'
                        onPress={copyToClipboard}
                        style={{ paddingTop: 10 }}
                      ></IconButton>
                    </Text>
                  </View>
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
    marginTop: 5,
    borderRadius: 7,
    fontSize: 15,
    borderWidth: 1,
  },
});
