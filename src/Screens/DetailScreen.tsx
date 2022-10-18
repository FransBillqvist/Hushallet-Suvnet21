import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DemandingCard from '../Components/Cards/DemandingCard';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;

export default function DetailScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Sysslns titel</Text>
      <Text>Sysslans beskrivning</Text>
      {/* <Text>Energivärde: 6</Text> */}
      <DemandingCard />
      <Text>Image: Liten pojke dammar</Text>
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
