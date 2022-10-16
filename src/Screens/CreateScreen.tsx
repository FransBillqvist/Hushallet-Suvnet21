import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TextInput, View } from 'react-native';
import BigButton from '../Components/Buttons/BigButton';
import { RootStackParamList } from '../Navigation/RootNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-get-random-values';
import { customAlphabet, nanoid } from 'nanoid';
import { AntDesign } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateScreen'>;

export default function CreateScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState('Namn ge ditt hushåll');
  let code = '';
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);
  if (text !== 'Namn ge ditt hushåll' && text.length > 3) {
    code = nanoid();
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
      </View>
      <View style={styles.spacer}></View>
      <View style={styles.inputsContainer}>
        {code !== '' ? (
          <Text style={styles.showInviteCode}>
            {code}
            <AntDesign name='copy1' size={24} color='black' />
          </Text>
        ) : (
          <Text style={{ fontSize: 20 }}>Din kod har inte genererats än.</Text>
        )}
      </View>
      <View style={styles.spacer}></View>
      <BigButton
        onPress={function (event: GestureResponderEvent): void {
          navigation.navigate('StartScreen');
        }}
      >
        <Text style={styles.textForButton}>
          <MaterialIcons name='add-circle-outline' size={21} color='black' />
          Skapa Hushåll
        </Text>
      </BigButton>
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
  inputsContainer: {
    minHeight: 50,
    flexBasis: 80,
    backgroundColor: '#fff',
    color: '#000000',
  },
  spacer: {
    flexBasis: 50,
  },
  textInput: {
    minWidth: 300,
    fontSize: 24,
    backgroundColor: '#e0e0e0',
    color: '#000000',
    borderRadius: 10,
    boarderColor: '#d8d8d8',
    borderWidth: 1,
  },
  showInviteCode: {
    fontSize: 24,
    backgroundColor: '#fff',
    color: '#000000',
  },
  textForButton: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
});
