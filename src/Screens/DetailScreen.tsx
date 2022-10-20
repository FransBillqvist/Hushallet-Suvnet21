import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;

export default function DetailScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Sysslns titel</Text>
      <Text>Sysslans beskrivning</Text>
      <Text>Energivärde: 6</Text>

      <Text>Image: Liten pojke dammar</Text>
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
