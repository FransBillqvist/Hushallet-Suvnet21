import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { setUserName } from '../Store/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export default function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <Text>Registrera användare</Text>
      <Text>Användarnamn</Text>
      <Text>Lösenord</Text>
      <Text>Lösenord igen</Text>
      <Button
        title='Test set name function'
        onPress={() => dispatch(setUserName('El Maco McToaster'))}
      />
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
