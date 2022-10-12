import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View>
      <View style={{ marginLeft: 15 }}>
        <View style={{ backgroundColor: 'yellow', paddingBottom: 20 }}>
          <Text>Användarnamn</Text>
          <TextInput style={styles.input} placeholder='Användarnamn'></TextInput>
        </View>
        <View style={{ backgroundColor: 'blue' }}>
          <Text>Lösenord</Text>
          <TextInput style={styles.input} placeholder='Lösenord'></TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text>Logga in</Text>
        </Pressable>
      </View>
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: 'grey',
          maxWidth: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'orange',
          padding: 10,
          marginLeft: 100,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  buttonContainer: {
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
  },
});
