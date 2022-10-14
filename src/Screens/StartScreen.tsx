import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../Components/Themed';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;

export default function StartScreen({ navigation }: Props) {
  return (
    <View style={styles.container} lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
      <View style={styles.inputContainer} lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
        <View style={styles.inputStyle} lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
          <Text style={styles.inputLabel}>Användarnamn</Text>
          <TextInput style={styles.inputTextField} placeholder='Användarnamn'></TextInput>
        </View>
        <View style={styles.inputStyle} lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
          <Text style={styles.inputLabel}>Lösenord</Text>
          <TextInput style={styles.inputTextField} placeholder='Lösenord'></TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer} lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Logga in</Text>
        </Pressable>
        <Text style={styles.ellerText}>eller</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Skapa konto</Text>
        </Pressable>
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
    borderColor: 'darkgrey',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
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
  button: {
    borderRadius: 1000,
    paddingVertical: 16,
    elevation: 4,
    minWidth: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  ellerText: {
    padding: 10,
    fontWeight: '700',
    fontSize: 18,
  },
});
