import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Input, Text } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { registerUser } from '../Store/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export default function RegisterScreen({ navigation }: Props) {
  const { isLoading, errorMsg } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          disabled={password.length <= 5 ? true : false}
          onPress={() => {
            dispatch(registerUser({ email, password }));
          }}
        >
          Registrera användare
        </Button>
        {errorMsg && <Text>{errorMsg}</Text>}
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
