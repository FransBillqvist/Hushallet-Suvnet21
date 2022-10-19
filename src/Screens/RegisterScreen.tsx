import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Input, Text } from 'native-base';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
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
    <Box style={styles.container}>
      <Text>Registrera användare</Text>

      <Input value={email} placeholder='fyll i användarnamn' onChangeText={setEmail} />
      <Input value={password} placeholder='fyll i lösenord' onChangeText={setPassword} />
      <Button
        disabled={password.length <= 5 ? true : false}
        onPress={() => {
          dispatch(registerUser({ email, password }));
        }}
      >
        Registrera användare
      </Button>
      {errorMsg && <Text>{errorMsg}</Text>}
      <Text>Current state email: {}</Text>
      <Text>Current user password: </Text>
    </Box>
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
