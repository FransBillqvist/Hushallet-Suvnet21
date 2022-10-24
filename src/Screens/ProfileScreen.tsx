import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { Text, TextInput } from 'react-native-paper';
import SmallButton from '../Components/Buttons/SmallButton';
import AvatarCard from '../Components/Cards/AvatarCard';
import { filterAvatarList } from '../Components/filterAvatarList';
import { getTheme } from '../Components/theme';
import { Profile } from '../Data/profile';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getHouseHoldByCode } from '../Store/householdSlice';
import { setProfileName } from '../Store/profileSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

// const avatarArray: string[] = ['🦊', '🐳', '🐷', '🐥', '🐸', '🐬', '🐙', '🦄']; // DESSA SKA FILTRERAS BORT BEROENDE PÅ VILKA SOM REDAN FINNS I HUSHÅLLET
const avatarsInUseArray: string[] = ['🐷', '🐸', '🐙', '🦄'];

export default function ProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.id);
  const [name, setName] = React.useState('');
  const [chosenAvatar, setAvatar] = React.useState('');

  const nav = navigation.getState().routes.find((nav) => nav.name === 'CreateScreen');

  return (
    <View style={styles.container}>
      <View style={styles.inputStyle}>
        <Text style={styles.inputLabel}>Namn</Text>
        <TextInput
          style={styles.inputTextField}
          placeholder='Profilnamn'
          onChangeText={setName}
          value={name}
        />
      </View>
      <View style={styles.avatarCard}>
        {filterAvatarList(avatarsInUseArray).map((avatar, index) => (
          <AvatarCard
            isActive={avatar === chosenAvatar}
            key={index}
            onTouchedEnd={() => {
              setAvatar(avatar);
            }}
          >
            {avatar}
          </AvatarCard>
        ))}
      </View>
      <View>
        <SmallButton
          style={styles.button}
          icon='plus-circle-outline'
          theme={getTheme('dark')}
          onPress={() => {
            const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 32);
            const householdMember = nav ? 'owner' : 'member';
            const newProfile: Profile = {
              id: nanoId(),
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              userId: userId!,
              name: name,
              avatar: chosenAvatar,
              role: householdMember,
              householdId: '123456', // DENNA SKA ÄNDRAS SÅ ATT DETTA HÄMTAS ISTÄLLET FÖR HÅRDKODAS
            };
            console.log(newProfile);
            dispatch(setProfileName(name));
            dispatch(getHouseHoldByCode('1q2uur')); // DENNA SKA FLYTTAS TILL EN ANNAN SCREEN
            navigation.navigate('HomeScreen');
          }}
        >
          Skapa
        </SmallButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 15,
  },
  inputTextField: {
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  inputStyle: {
    marginTop: 10,
  },
  avatarCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
  },
});
