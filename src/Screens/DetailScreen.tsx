import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ChoreCard from '../Components/Cards/ChoreCard';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;

export default function DetailScreen(navigator: Props) {
  const chores = useAppSelector((state) => state.chore);

  return (
    <ScrollView>
      <View>
        <ChoreCard>
          <Text>
            {chores.chores[0].name}
            {chores.chores[0].frequency}
          </Text>
        </ChoreCard>
        <ChoreCard>
          <Text>{chores.chores[0].description}</Text>
        </ChoreCard>
        <ChoreCard>
          <Text>Energivärde: {chores.chores[0].demanding}</Text>
        </ChoreCard>
        <Text>Image: Liten pojke dammar</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
