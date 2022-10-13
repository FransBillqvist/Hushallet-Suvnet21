import { addDoc, collection } from '@firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { fireStore } from '../Config/firebase';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;

export default function StartScreen({ navigation }: Props) {
  const testfb = async () => {
    await addDoc(collection(fireStore, 'test'), {name: 'test'})
  };
  const Testreg = async () => {
    await addDoc(collection(fireStore, 'User'), {name: Date.now().toString()})
  };
  return (
    <View style={styles.container}>
      <Text>Logga in eller skapa konto</Text>
      <Text>Knapp: Logga in</Text>
      <Text>Knapp: Registrera konto</Text>
      <Button title='Log in' onPress={() => navigation.navigate('ManagerScreen')}></Button>
      <Button title='Register' onPress={() => navigation.navigate('RegisterScreen')}></Button>
      <Button title='Register to DB' onPress={() => Testreg()}></Button>
      <Button title='Test firebase add' onPress={() => testfb()}></Button>
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
