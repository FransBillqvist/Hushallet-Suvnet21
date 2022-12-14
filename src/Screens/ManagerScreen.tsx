import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar, Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import HugeButton from '../Components/Buttons/HugeButton';
import { getTheme } from '../Components/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';
import {
  emptyChoreHistoryState,
  getChoreHistoryFromDbByProfileIds,
} from '../Store/choreHistorySlice';
import { flushChores } from '../Store/choreSlice';
import { flushHousehold, getHouseHoldByCode, selectActiveHousehold } from '../Store/householdSlice';
import {
  flushCurrentProfile,
  flushProfileList,
  getCurrentAmountOfProfiles,
  getProfilesForHousehold,
  profileAlreadyInHousehold,
} from '../Store/profileSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { logout } from '../Store/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'ManagerScreen'>;

export default function ManagerScreen({ navigation }: Props) {
  const [inviteCode, setInviteCode] = React.useState('');
  const [isHide, setIsHide] = React.useState(true);
  const buttonValue = isHide ? 'Gå med i befintligt hushåll' : 'Stäng';
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.uid);
  const listOfHouses = useAppSelector((state) => state.household.households);
  const profiles = useAppSelector((state) => state.profile.profiles);
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Dina hushåll</Text>

      <HugeButton
        icon='plus-circle-outline'
        theme={getTheme('light')} //Ändra till Setting för att få rätt färg
        onPress={() => navigation.navigate('CreateScreen')}
        style={styles.marginBot}
      >
        Skapa nytt hushåll
      </HugeButton>

      {listOfHouses.map((house) => (
        <HugeButton
          icon='home'
          theme={getTheme('light')}
          onPress={async () => {
            dispatch(flushCurrentProfile());
            await dispatch(selectActiveHousehold(house.id));
            navigation.navigate('HomeScreen');
          }}
          key={house.id}
          style={styles.marginBot}
        >
          <Text>{house.name}</Text>
        </HugeButton>
      ))}

      <HugeButton
        icon='plus-circle-outline'
        theme={getTheme('light')} //Ändra till Setting för att få rätt färg
        onPress={() => setIsHide(!isHide)}
      >
        {buttonValue}
      </HugeButton>
      {isHide ? (
        <></>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder='kod'
            value={inviteCode}
            onChangeText={setInviteCode}
          ></TextInput>
          <BigButton
            theme={getTheme('light')} //Ändra till Setting för att få rätt färg
            onPress={async () => {
              try {
                const result = await dispatch(getHouseHoldByCode(inviteCode)).unwrap();
                const isHouseholdFull = await dispatch(getCurrentAmountOfProfiles(result.id));
                if (isHouseholdFull.payload) {
                  {
                    onToggleSnackBar();
                  }
                } else {
                  if (result) {
                    const profileExists = await dispatch(
                      profileAlreadyInHousehold([userId, result.id]),
                    ).unwrap();
                    if (profileExists) {
                      navigation.navigate('HomeScreen');
                    } else {
                      await dispatch(getProfilesForHousehold(result.id));
                      await dispatch(emptyChoreHistoryState());
                      dispatch(
                        await getChoreHistoryFromDbByProfileIds(
                          profiles.filter((pro) => pro.householdId == result.id), // TODO: SE ÖVER
                        ),
                      );
                      navigation.navigate('ProfileScreen');
                    }
                  }
                }
              } catch {
                {
                  onToggleSnackBar();
                }
              }
            }}
          >
            Skicka förfrågan
          </BigButton>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Stäng',
              onPress: () => {
                {
                  setVisible(true);
                }
              },
            }}
          >
            Något gick snett.
          </Snackbar>
        </>
      )}
      <BigButton
        theme={getTheme('light')}
        style={{ marginTop: 40 }}
        onPress={() => {
          dispatch(logout());
          dispatch(flushHousehold());
          dispatch(flushCurrentProfile());
          dispatch(flushProfileList());
          dispatch(flushChores());
          dispatch(emptyChoreHistoryState());
        }}
      >
        Logga ut
      </BigButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  marginBot: {
    marginBottom: 10,
  },
});
