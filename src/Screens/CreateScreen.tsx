import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { IconButton, Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { getTheme } from '../Components/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { setHousehold } from '../Store/householdSlice';
import { useAppDispatch } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateScreen'>;

export default function CreateScreen({ navigation }: Props) {
  const [text, onChangeText] = React.useState('');
  const dispatch = useAppDispatch();

  const nanoCode = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);
  const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 32);
  let code = '';

  if (text.length > 3) {
    code = nanoCode();
  }

  const AddHouse = async () => {
    await dispatch(setHousehold({ id: nanoId(), name: text, code: code }));
  };

  const copyToClipboard = () => {
    Clipboard.setStringAsync(code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View style={styles.inputStyle}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeText}
            label='Namnge ditt hushåll'
            value={text}
          ></TextInput>
        </View>
        <View style={styles.spacer}></View>
        <View style={styles.inputsContainer}>
          {code !== '' ? (
            <View>
              <View style={styles.changingTextContainer}>
                <Text style={styles.changingTextFont}>Hushållets inbjudningskod </Text>
              </View>
              <View style={styles.inviteCodeBox}>
                <Text style={styles.showInviteCode}>
                  {code}
                  <IconButton icon='content-copy' onPress={copyToClipboard}></IconButton>
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.changingTextContainer}>
              <Text style={styles.changingTextFont}>Din kod har inte genererats än.</Text>
            </View>
          )}
        </View>
        <View style={styles.spacer}></View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonPosition}>
          <BigButton
            theme={getTheme('light')}
            disabled={code !== '' ? false : true}
            onPress={function (): void {
              AddHouse();
              navigation.replace('ProfileScreen');
            }}
            icon='home-plus-outline'
          >
            <Text style={styles.textForButton}>Skapa Hushåll</Text>
          </BigButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputsContainer: {
    paddingHorizontal: 12,
    width: '100%',
  },
  spacer: {
    flexBasis: 25,
  },
  textInput: {
    borderRadius: 7,
    fontSize: 15,
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
  inputStyle: {
    marginTop: 10,
  },
  inviteCodeBox: {
    alignItems: 'center',
    paddingVertical: 25,
    borderWidth: 1,
    borderRadius: 7,
  },
  changingTextContainer: {
    alignItems: 'center',
  },
  changingTextFont: {
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonPosition: {
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});
