import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ChoreScreen'>;

export default function ChoreScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>TextInput: Titel</Text>
      <Text>TextInput: Beskrivning</Text>
      <Text>Återkommer: var blabla dag </Text>
      <Text>Värde: 1-2-4-6-8 </Text>
      <Text>SKALL HA EDIT </Text>
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
