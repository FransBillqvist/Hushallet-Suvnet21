import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { setUserName, setUserPassword } from '../Store/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export default function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [password, onChangePassword] = useState<string>('');
  const [userName, onChangeUserName] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text>Registrera användare</Text>

      <TextInput
        value={userName}
        placeholder='fyll i användarnamn'
        onChangeText={onChangeUserName}
      ></TextInput>
      <TextInput
        value={password}
        placeholder='fyll i lösenord'
        onChangeText={onChangePassword}
      ></TextInput>
      <Button
        title='Registrera användare'
        onPress={() => {
          dispatch(setUserName(userName));
          dispatch(setUserPassword(password));
        }}
      />
      <Text>Current user password: {user.password}</Text>
      <Text>Current state username: {user.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
