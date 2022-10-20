import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ManagerScreen'>;

export default function ManagerScreen() {
  return (
    <View style={styles.container}>
      <Text>Hushålls-skärm</Text>
      <Text>Knapp: Skapa nytt hushåll(ägare)</Text>
      <Text>Dropdown menu: Gå med i ett hushåll</Text>
      <Text>Knapp: Skriv in hushållskod(För att gå med i hushåll) Knapp: Acceptera</Text>
      <Text>Lista med hushåll</Text>
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
