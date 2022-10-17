import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SmallButton from '../Components/Buttons/SmallButton';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { setProfileName } from '../Store/profileSlice';
import { useAppDispatch } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

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
      <Text>Välj Avatar</Text>
      <View>
        <SmallButton
          onPress={() => {
            dispatch(setProfileName(name));
          }}
          startIcon={<MaterialIcons name='add-circle-outline' size={21} color='black' />}
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
    backgroundColor: '#fff',
    padding: 20,
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 15,
  },
  inputTextField: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'darkgrey',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    fontSize: 15,
  },
  inputStyle: {
    marginTop: 10,
  },
});
