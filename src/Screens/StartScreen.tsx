import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { getTheme } from '../Components/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { login } from '../Store/userSlice';

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
          <TextInput
            mode='outlined'
            style={styles.inputTextField}
            value={email}
            onChangeText={setEmail}
            label='Email'
          ></TextInput>
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            mode='outlined'
            style={styles.inputTextField}
            value={password}
            onChangeText={setPassword}
            label='Lösenord'
          ></TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <BigButton theme={getTheme('dark')} onPress={() => dispatch(login({ email, password }))}>
          Logga In
        </BigButton>
        <Text style={styles.ellerText}>eller</Text>
        <BigButton theme={getTheme('dark')} onPress={() => navigation.navigate('RegisterScreen')}>
          Skapa konto
        </BigButton>
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
    borderRadius: 7,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  inputStyle: {
    marginTop: 10,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
  },
  ellerText: {
    padding: 10,
    fontWeight: '700',
    fontSize: 18,
  },
});
