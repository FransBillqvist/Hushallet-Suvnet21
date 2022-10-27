import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { Household } from '../Data/household';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getASingleChore } from '../Store/choreSlice';
import { editHouseholdName } from '../Store/householdSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chores = useAppSelector((state) => state.chore);
  const householdId = useAppSelector((state) => state.household.singleHousehold?.id);
  const householdCode = useAppSelector((state) => state.household.singleHousehold?.code);
  const householdIddAsString = householdId as string;
  const householdCodeAsString = householdCode as string;

  const [originalHouseHold, editedHousehold] = React.useState<Household>({
    id: householdIddAsString,
    name: '',
    code: householdCodeAsString,
  });

  const handleHouseholdChange = (key: string, value: string | number) => {
    editedHousehold((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {chores.chores.map((chore) => (
            <View key={chore.id}>
              <ChoreCard chore={chore}>
                <Text>{chore.name}</Text>
                <Text>{chore.frequency}</Text>
              </ChoreCard>
              <Button
                title='Redigera'
                onPress={() => navigation.navigate('EditChoreScreen', { id: chore.id })}
                />
              <Button
                title='To detailscreen'
                onPress={() => {
                  dispatch(getASingleChore(chore.id)), navigation.navigate('DetailScreen');
                }}
              />
            </View>
          ))}
        </View>
        <Button title='Lägg till en ny syssla' onPress={() => navigation.navigate('ChoreScreen')} />
      </View>

      <TextInput
        style={styles.input}
        outlineColor='transparent'
        mode='outlined'
        label='Titel'
        placeholder={originalHouseHold.name}
        value={originalHouseHold.name}
        onChangeText={(text: string) => handleHouseholdChange('name', text)}
      />

      <BigButton
        theme={getTheme('dark')}
        onPress={() => {
          dispatch(editHouseholdName(originalHouseHold));
          navigation.navigate('HomeScreen');
        }}
        style={{ marginTop: 10 }}
      >
        Spara ändringar
      </BigButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 10,
  },
});
