import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { nanoid } from 'nanoid';
import { Box } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import DemandingCard from '../Components/Cards/DemandingCard';
import { ChoreCreate } from '../Data/chore';
import { RootStackParamList } from '../Navigation/RootNavigator';
import {
  addChoreToDb,
  setChoreDemanding,
  setChoreDescription,
  setChoreFrequency,
  setChoreName,
} from '../Store/choreSlice';
import { useAppDispatch } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'ChoreScreen'>;

export default function ChoreScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [chore, newChore] = React.useState<ChoreCreate>({
    id: nanoid(10),
    name: '',
    description: '',
    demanding: 0,
    frequency: 0,
    householdId: nanoid(5),
  });
  const handleChange = (key: string, value: string | number) => {
    newChore((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Skapa en ny syssla</Text>
      <ChoreCard>
        <TextInput
          value={chore.name}
          placeholder='Titel'
          onChangeText={(text: string) => handleChange('name', text)}
        />
        <Box></Box>
      </ChoreCard>

      <ChoreCard>
        <TextInput
          value={chore.description}
          placeholder='Beskrivning'
          onChangeText={(text: string) => handleChange('description', text)}
        />
      </ChoreCard>
      <ChoreCard>
        <Box>Återkommer</Box>
        <Box>
          Var
          <TextInput
            value={chore.frequency.toString()}
            keyboardType='numeric'
            onChangeText={(num: string) => handleChange('frequency', Number(num))}
          />
          dag
        </Box>
      </ChoreCard>
      <DemandingCard />
      <BigButton
        onPress={() => {
          dispatch(setChoreName(chore.name));
          dispatch(setChoreDescription(chore.description));
          dispatch(setChoreFrequency(chore.frequency));
          dispatch(setChoreDemanding(chore.demanding));
          dispatch(addChoreToDb(chore));
        }}
      >
        Lägg till syssla
      </BigButton>
      <Text>Todo: edit chore läge </Text>
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
