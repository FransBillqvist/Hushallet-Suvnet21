import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'StatisticsScreen'>;

export default function StatisticsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Pil-vänster FÖRRA VECKAN pil-höger </Text>
      <Text>Piechart: TOTALT</Text>
      <Text>Display: Alla sysslors pie charts </Text>
      <Button title='Register' onPress={() => navigation.navigate('RegisterScreen')}></Button>
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
