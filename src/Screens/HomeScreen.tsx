import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getChores } from '../Store/choreSlice';
import { useAppDispatch } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getChores('VCOK0'));
  });
  return (
    <View style={styles.container}>
      <Text>Chores to be done</Text>
      <Button title='Lägg till en ny syssla' onPress={() => navigation.navigate('ChoreScreen')} />
      <Button title='Redigera en syssla' onPress={() => navigation.navigate('EditChoreScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
