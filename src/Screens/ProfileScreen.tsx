import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import SmallButton from '../Components/Buttons/SmallButton';
import AvatarCard from '../Components/Cards/AvatarCard';
import { getTheme } from '../Components/theme';
import { Profile } from '../Data/profile';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { setProfileName } from '../Store/profileSlice';
import { useAppDispatch } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const avatarArray: string[] = ['🦊', '🐳', '🐷', '🐥', '🐸', '🐬', '🐙', '🦄'];

export default function ProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState('');

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
        {avatarArray.map((avatar, index) => (
          <AvatarCard key={index}>{avatar}</AvatarCard>
        ))}
      </View>
      <View>
        <SmallButton
          style={styles.button}
          extended
          label=''
          icon='plus-circle-outline'
          theme={getTheme('light')}
          onPress={() => {
            dispatch(setProfileName(name));
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
