import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
