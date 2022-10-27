import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import HugeButton from '../Components/Buttons/HugeButton';
import { getTheme } from '../Components/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getChores } from '../Store/choreSlice';
import { getHouseHoldByCode } from '../Store/householdSlice';
import {
  getCurrentAmountOfProfiles,
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
  const userIdAsString = userId as string;
  const listOfHouses = useAppSelector((state) => state.household.households);

  //SELECTOR?

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Hushållsmöjligheter</Text>

      {listOfHouses.map((house) => (
        <HugeButton
          icon='home'
          theme={getTheme('light')}
          onPress={async () => {
            await dispatch(getChores(house.id)).unwrap();
            navigation.navigate('HomeScreen');
          }}
          key={house.id}
        >
          <Text>{house.name}</Text>
        </HugeButton>
      ))}
      <HugeButton
        icon='plus-circle-outline'
        theme={getTheme('light')} //Ändra till Setting för att få rätt färg
        onPress={() => navigation.navigate('CreateScreen')}
        style={{ marginBottom: 10 }}
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
                      profileAlreadyInHousehold([userIdAsString, result.id]),
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
      <Text>Lista med hushåll som användaren är med i</Text>
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
});
