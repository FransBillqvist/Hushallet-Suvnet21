import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
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
    <View>
      <Text>Registrera användare</Text>
      <View>
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
      </View>
      <View>
        <Button
          onPress={() => {
            dispatch(setUserName(userName));
            dispatch(setUserPassword(password));
          }}
        >
          Registrera användare
        </Button>
        <Text>Current user password: {user.password}</Text>
        <Text>Current state username: {user.username}</Text>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
