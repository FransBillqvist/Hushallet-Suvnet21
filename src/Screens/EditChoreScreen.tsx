import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text, TextInput, Modal, Button, Portal } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { ChoreCreate } from '../Data/chore';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { editChore } from '../Store/choreSlice';
import { useAppDispatch } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'EditChoreScreen'>;

export default function EditChoreScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Redigera syssla</Text>
      <ChoreCard>
        <TextInput
          style={styles.input}
          outlineColor='transparent'
          mode='outlined'
          value={originalchore.name}
          placeholder='Titel'
          onChangeText={(text: string) => handleChange('name', text)}
        />
      </ChoreCard>
      <ChoreCard>
        <TextInput
          style={styles.input}
          outlineColor='transparent'
          mode='outlined'
          value={originalchore.description}
          placeholder='Beskrivning'
          onChangeText={(text: string) => handleChange('description', text)}
        />
      </ChoreCard>
      <ChoreCard>
        <Text>Återkommer</Text>
        <Text>{originalchore.frequency.toString()}</Text>
        <Text>
          Var
          <TextInput
            style={styles.input}
            outlineColor='transparent'
            mode='outlined'
            value={originalchore.frequency.toString()}
            keyboardType='numeric'
            onChangeText={(num: string) => handleChange('frequency', Number(num))}
          />
          dag
        </Text>
      </ChoreCard>
      <ChoreCard>
        <Text>Energivärde:</Text>
        <Text>{originalchore.demanding.toString()}</Text>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <RadioButton.Group onValueChange={(newValue) => setValue(newValue)} value={value}>
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
                handleChange('demanding', Number(value)), setVisible(false), console.log(value)
              )}
            >
              Ok
            </Button>
          </Modal>
        </Portal>
        <Button onPress={showModal}>Välj</Button>
      </ChoreCard>
      {/*Needs to dispatch an edit thunk in ChoreSlice*/}
      <BigButton
        theme={getTheme('dark')}
        onPress={() => {
          dispatch(editChore(originalchore));
          navigation.navigate('HomeScreen');
        }}
        style={{ marginTop: 10 }}
      >
        Spara ändringar
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
