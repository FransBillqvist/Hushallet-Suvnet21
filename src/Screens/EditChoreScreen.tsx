import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import DemandingCard from '../Components/Cards/DemandingCard';
import { getTheme } from '../Components/theme';
import { ChoreCreate } from '../Data/chore';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { editChore } from '../Store/choreSlice';
import { useAppDispatch } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'EditChoreScreen'>;

export default function EditChoreScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [originalchore, editedChore] = React.useState<ChoreCreate>({
    id: '',
    name: '',
    description: '',
    demanding: 0,
    frequency: 0,
    householdId: '',
  });

  const handleChange = (key: string, value: string | number) => {
    editedChore((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Redigera syssla</Text>
      <ChoreCard>
        <TextInput
          value={originalchore.name}
          placeholder='Titel'
          onChangeText={(text: string) => handleChange('name', text)}
        />
      </ChoreCard>

      <ChoreCard>
        <TextInput
          value={originalchore.description}
          placeholder='Beskrivning'
          onChangeText={(text: string) => handleChange('description', text)}
        />
      </ChoreCard>
      <ChoreCard>
        <Text>Återkommer</Text>
        <Text>
          Var
          <TextInput
            value={originalchore.frequency.toString()}
            keyboardType='numeric'
            onChangeText={(num: string) => handleChange('frequency', Number(num))}
          />
          dag
        </Text>
      </ChoreCard>
      <DemandingCard />
      {/*Needs to dispatch an edit thunk in ChoreSlice*/}
      <BigButton
        theme={getTheme('dark')}
        onPress={() => {
          dispatch(editChore(originalchore));
          navigation.navigate('HomeScreen');
        }}
      >
        Spara ändringar
      </BigButton>
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
