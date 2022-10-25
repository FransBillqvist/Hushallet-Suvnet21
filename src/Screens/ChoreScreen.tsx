import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text, TextInput, Modal, Button, Portal } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
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
  const [demandingValue, setDemandingValue] = React.useState('');
  const [frequencyValue, setFrequencyValue] = React.useState('');
  const [demandingVisible, setDemandingVisible] = React.useState(false);
  const [frequencyVisible, setFrequencyVisible] = React.useState(false);
  const showDemandingModal = () => setDemandingVisible(true);
  const hideDemandingModal = () => setDemandingVisible(false);
  const showFrequencyModal = () => setFrequencyVisible(true);
  const hideFrequencyModal = () => setFrequencyVisible(false);
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
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Skapa en ny syssla</Text>
      <ChoreCard>
        <TextInput
          outlineColor='transparent'
          mode='outlined'
          value={chore.name}
          placeholder='Titel'
          onChangeText={(text: string) => handleChange('name', text)}
        />
      </ChoreCard>
      <ChoreCard>
        <TextInput
          style={styles.input}
          outlineColor='transparent'
          mode='outlined'
          value={chore.description}
          placeholder='Beskrivning'
          onChangeText={(text: string) => handleChange('description', text)}
        />
      </ChoreCard>
      <ChoreCard>
        <Text>Återkommer</Text>
        <Text>Var {chore.frequency.toString()}:e Dag</Text>
        <Portal>
          <Modal
            visible={frequencyVisible}
            onDismiss={hideFrequencyModal}
            contentContainerStyle={containerStyle}
          >
            <RadioButton.Group
              onValueChange={(newValue) => setFrequencyValue(newValue)}
              value={frequencyValue}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>1</Text>
                <RadioButton value='1' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>2</Text>
                <RadioButton value='2' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>3</Text>
                <RadioButton value='3' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>4</Text>
                <RadioButton value='4' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>5</Text>
                <RadioButton value='5' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>6</Text>
                <RadioButton value='6' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>7</Text>
                <RadioButton value='7' />
              </View>
            </RadioButton.Group>
            <Button
              onPress={() => (
                handleChange('frequency', Number(frequencyValue)), setFrequencyVisible(false)
              )}
            >
              Ok
            </Button>
          </Modal>
        </Portal>
        <Button onPress={showFrequencyModal}>Välj</Button>
      </ChoreCard>
      <ChoreCard>
        <Text>Energivärde:</Text>
        <Text>{chore.demanding.toString()}</Text>
        <Portal>
          <Modal
            visible={demandingVisible}
            onDismiss={hideDemandingModal}
            contentContainerStyle={containerStyle}
          >
            <RadioButton.Group
              onValueChange={(newValue) => setDemandingValue(newValue)}
              value={demandingValue}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>1</Text>
                <RadioButton value='1' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>2</Text>
                <RadioButton value='2' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>3</Text>
                <RadioButton value='3' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>4</Text>
                <RadioButton value='4' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>5</Text>
                <RadioButton value='5' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>6</Text>
                <RadioButton value='6' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>7</Text>
                <RadioButton value='7' />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>8</Text>
                <RadioButton value='8' />
              </View>
            </RadioButton.Group>
            <Button
              onPress={() => (
                handleChange('demanding', Number(demandingValue)), setDemandingVisible(false)
              )}
            >
              Ok
            </Button>
          </Modal>
        </Portal>
        <Button onPress={showDemandingModal}>Välj</Button>
      </ChoreCard>
      <BigButton
        theme={getTheme('dark')}
        onPress={() => {
          dispatch(setChoreName(chore.name));
          dispatch(setChoreDescription(chore.description));
          dispatch(setChoreFrequency(chore.frequency));
          dispatch(setChoreDemanding(chore.demanding));
          dispatch(addChoreToDb(chore));
          navigation.navigate('HomeScreen');
        }}
        style={{ marginTop: 10 }}
      >
        Lägg till syssla
      </BigButton>
    </View>
  );
}

const containerStyle = { backgroundColor: 'white', padding: 10 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
});
