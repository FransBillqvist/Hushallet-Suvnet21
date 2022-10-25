import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ChoreCard from '../Components/Cards/ChoreCard';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getChores } from '../Store/choreSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chores = useAppSelector((state) => state.chore);
  const activeHouse = useAppSelector((state) => state.household.singleHousehold);

  if(activeHouse?.name === '') {
    navigation.navigate('ManagerScreen');
  }
  React.useEffect(() => {
    dispatch(getChores(activeHouse?.id || 'VCOK0'));
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {chores.chores.map((chore) => (
            <View key={chore.id}>
              <Pressable  onPress={() => navigation.navigate('DetailScreen')} >
              <ChoreCard chore={chore}>
                <Text>{chore.name}</Text>
                <Text>{chore.frequency}</Text>
              </ChoreCard>
            </Pressable>
            </View>
          ))}
        </View>
        <Button title='Lägg till en ny syssla' onPress={() => navigation.navigate('ChoreScreen')} />
        <Button title='Redigera en syssla' onPress={() => navigation.navigate('EditChoreScreen')} />
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
