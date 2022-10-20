import { addDoc, collection } from '@firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { IconButton, Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { db } from '../Config/firebase';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateScreen'>;

export default function CreateScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState('');

  const nanoCode = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);
  const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 32);
  let code = '';

  if (text.length > 3) {
    code = nanoCode();
  }
  //test a new line to merge
  const AddHouse = async () => {
    await addDoc(collection(db, 'Household'), { id: nanoId(), name: text, code: code });
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
        disabled={code !== '' ? false : true}
        onPress={function (): void {
          AddHouse();
          navigation.navigate('StartScreen');
        }}
        icon='home-plus-outline'
      >
        <Text style={styles.textForButton}>Skapa Hushåll</Text>
      </BigButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    minHeight: 50,
    flexBasis: 80,
  },
  spacer: {
    flexBasis: 50,
  },
  textInput: {
    paddingLeft: 6,
    minWidth: 300,
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 1,
  },
  showInviteCode: {
    fontSize: 24,
  },
  textForButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
