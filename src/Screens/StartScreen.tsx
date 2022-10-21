import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { login } from '../Store/userSlice';
import { auth } from '../Config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;

export default function StartScreen({ navigation }: Props) {
  const { isLoading, errorMsg } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputStyle}>
          <Text style={styles.inputLabel}>Användarnamn</Text>
          <TextInput
            style={styles.inputTextField}
            value={email}
            onChangeText={setEmail}
            placeholder='Användarnamn'
          ></TextInput>
        </View>
        <View style={styles.inputStyle}>
          <Text style={styles.inputLabel}>Lösenord</Text>
          <TextInput
            style={styles.inputTextField}
            value={password}
            onChangeText={setPassword}
            placeholder='Lösenord'
          ></TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <BigButton onPress={() => dispatch(login({ email, password }))}>Logga In</BigButton>
        <Text style={styles.ellerText}>eller</Text>
        <BigButton onPress={() => navigation.navigate('RegisterScreen')}>Skapa konto</BigButton>
        {errorMsg && <Text>{errorMsg}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 15,
    width: '100%',
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 15,
  },
  inputTextField: {
    borderWidth: 1,
    borderRadius: 7,
    // borderColor: 'darkgrey',
    paddingHorizontal: 12,
    paddingVertical: 8,
    // backgroundColor: 'grey',
    fontSize: 15,
  },
  inputStyle: {
    marginTop: 10,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 300,
    marginTop: 45,
  },
  ellerText: {
    padding: 10,
    fontWeight: '700',
    fontSize: 18,
  },
});
