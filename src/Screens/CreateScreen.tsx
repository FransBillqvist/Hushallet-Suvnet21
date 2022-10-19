import { addDoc, collection } from '@firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { IconButton, Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { fireStore } from '../Config/firebase';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateScreen'>;

export default function CreateScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState('');
  let code = '';
  let isDisabled = true;

  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);
  if (text !== 'Namn ge ditt hushåll' && text.length > 3) {
    code = nanoid();
    isDisabled = false;
  }
  const AddHouse = async () => {
    await addDoc(collection(fireStore, 'Household'), { id: nanoid(), name: text, code: code });
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder={'Namn ge ditt hushåll'}
          value={text}
        ></TextInput>
      </View>
      <View style={styles.spacer}></View>
      <View style={styles.inputsContainer}>
        {code !== '' ? (
          <Text style={styles.showInviteCode}>
            {code}
            <IconButton icon='content-copy' onPress={copyToClipboard}></IconButton>
          </Text>
        ) : (
          <Text style={{ fontSize: 20 }}>Din kod har inte genererats än.</Text>
        )}
      </View>
      <View style={styles.spacer}></View>
      <BigButton
        onPress={function (): void {
          AddHouse();
          navigation.navigate('StartScreen');
        }}
        icon='home-plus-outline'
        disabled={isDisabled}
      >
        <Text style={styles.textForButton}>Skapa Hushåll</Text>
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
    paddingLeft: 6,
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
