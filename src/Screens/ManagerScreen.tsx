import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import HugeButton from '../Components/Buttons/HugeButton';
import { getTheme } from '../Components/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { emptyChoreHistoryState } from '../Store/choreHistorySlice';
import { getChores } from '../Store/choreSlice';
import { getHouseHoldByCode, selectActiveHousehold } from '../Store/householdSlice';
import {
  flushCurrentProfile,
  getCurrentAmountOfProfiles,
  getCurrentProfile,
  getProfilesByUserId,
  getProfilesForHousehold,
  profileAlreadyInHousehold,
} from '../Store/profileSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'ManagerScreen'>;

export default function ManagerScreen({ navigation }: Props) {
  const [inviteCode, setInviteCode] = React.useState('');
  const [isHide, setIsHide] = React.useState(true);
  const buttonValue = isHide ? 'Gå med i befintligt hushåll' : 'Stäng';
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.uid);
  const listOfHouses = useAppSelector((state) => state.household.households);
  const profiles = useAppSelector((state) => state.profile.profiles);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Hushållsmöjligheter</Text>

      {listOfHouses.map((house) => (
        <HugeButton
          icon='home'
          theme={getTheme('light')}
          onPress={async () => {
            dispatch(flushCurrentProfile());
            await dispatch(selectActiveHousehold(house.id))
              .unwrap()
              .then(async () => {
                await dispatch(getProfilesForHousehold(house.id));
                await dispatch(getProfilesByUserId(userId));
                await dispatch(getChores(house.id));
                await dispatch(emptyChoreHistoryState());
                await dispatch(
                  getCurrentProfile(profiles.filter((profile) => profile.householdId == house.id)),
                );
                navigation.navigate('HomeScreen');
              });
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
        onPress={() => navigation.navigate('CreateScreen')}
        style={styles.marginBot}
      >
        Skapa nytt hushåll
      </HugeButton>

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
                  //någon kanske har tid att fixa en design åt detta meddelande?
                  alert('Huset är fullt, prata med hushållets ägare för att få plats.');
                } else {
                  if (result) {
                    const profileExists = await dispatch(
                      profileAlreadyInHousehold([userId, result.id]),
                    ).unwrap();
                    if (profileExists) {
                      navigation.navigate('HomeScreen');
                    } else {
                      await dispatch(getProfilesForHousehold(result.id));
                      navigation.navigate('ProfileScreen');
                    }
                  }
                }
              } catch {
                alert('Inget hushåll existerar med denna kod.');
              }
            }}
          >
            Skicka förfrågan
          </BigButton>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
