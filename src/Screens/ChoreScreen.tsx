import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, RadioButton, Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';
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
import { useAppDispatch, useAppSelector } from '../Store/store';

const formValidationSchema = yup.object().shape({
  name: yup.string().required('Namn är obligatoriskt'),
  description: yup.string().required('Beskrivning är obligatoriskt'),
});

type Props = NativeStackScreenProps<RootStackParamList, 'ChoreScreen'>;

export default function ChoreScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
  const householdId = useAppSelector((state) => state.household.singleHousehold?.id);
  const householdIdAsString = householdId as string;

  const [demandingValue, setDemandingValue] = React.useState('');
  const [frequencyValue, setFrequencyValue] = React.useState('');
  const [demandingVisible, setDemandingVisible] = React.useState(false);
  const [frequencyVisible, setFrequencyVisible] = React.useState(false);
  const showDemandingModal = () => setDemandingVisible(true);
  const hideDemandingModal = () => setDemandingVisible(false);
  const showFrequencyModal = () => setFrequencyVisible(true);
  const hideFrequencyModal = () => setFrequencyVisible(false);
  const [chore, newChore] = React.useState<ChoreCreate>({
    id: '+' + nanoId(10),
    name: '',
    description: '',
    demanding: 0,
    frequency: 0,
    householdId: householdIdAsString,
  });
  const handleChange = (key: string, value: string | number) => {
    newChore((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          validationSchema={formValidationSchema}
          onSubmit={(values) => {
            chore.name = values.name;
            chore.description = values.description;
            handleChange('name', values.name);
            handleChange('description', values.description);
            dispatch(setChoreName(chore.name));
            dispatch(setChoreDescription(chore.description));
            dispatch(setChoreFrequency(chore.frequency));
            dispatch(setChoreDemanding(chore.demanding));
            dispatch(addChoreToDb(chore));
            navigation.navigate('HomeScreen');
          }}
          initialValues={{ name: '', description: '' }}
        >
          {(props) => (
            <View>
              <ChoreCard style={{ marginTop: 14 }}>
                <TextInput
                  style={styles.input}
                  outlineColor='transparent'
                  mode='outlined'
                  label='Titel'
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                />
                <Text style={styles.errorMessage}>{props.touched.name && props.errors.name}</Text>
              </ChoreCard>
              <ChoreCard style={{ minHeight: 129 }}>
                <TextInput
                  style={styles.input}
                  outlineColor='transparent'
                  numberOfLines={4}
                  multiline={true}
                  mode='outlined'
                  label='Beskrivning'
                  value={props.values.description}
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                />
                <Text style={styles.errorMessage}>
                  {props.touched.description && props.errors.description}
                </Text>
              </ChoreCard>
              <View>
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
                        <View style={styles.radioButtonStyle}>
                          <Text>1</Text>
                          <RadioButton value='1' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>2</Text>
                          <RadioButton value='2' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>3</Text>
                          <RadioButton value='3' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>4</Text>
                          <RadioButton value='4' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>5</Text>
                          <RadioButton value='5' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>6</Text>
                          <RadioButton value='6' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>7</Text>
                          <RadioButton value='7' />
                        </View>
                      </RadioButton.Group>
                      <Button
                        onPress={() => (
                          handleChange('frequency', Number(frequencyValue)),
                          setFrequencyVisible(false)
                        )}
                      >
                        Ok
                      </Button>
                    </Modal>
                  </Portal>
                  <Button onPress={showFrequencyModal}>Välj</Button>
                </ChoreCard>
                <ChoreCard style={{ minHeight: 70 }}>
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
                        <View style={styles.radioButtonStyle}>
                          <Text>1</Text>
                          <RadioButton value='1' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>2</Text>
                          <RadioButton value='2' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>3</Text>
                          <RadioButton value='3' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>4</Text>
                          <RadioButton value='4' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>5</Text>
                          <RadioButton value='5' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>6</Text>
                          <RadioButton value='6' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>7</Text>
                          <RadioButton value='7' />
                        </View>
                        <View style={styles.radioButtonStyle}>
                          <Text>8</Text>
                          <RadioButton value='8' />
                        </View>
                      </RadioButton.Group>
                      <Button
                        onPress={() => (
                          handleChange('demanding', Number(demandingValue)),
                          setDemandingVisible(false)
                        )}
                      >
                        Ok
                      </Button>
                    </Modal>
                  </Portal>
                  <Button onPress={showDemandingModal}>Välj</Button>
                </ChoreCard>
              </View>

              <View style={styles.bigButtonContainer}>
                <View style={{ justifyContent: 'flex-end' }}>
                  <BigButton
                    theme={getTheme('dark')}
                    onPress={props.handleSubmit}
                    style={styles.bigButtonStyle}
                  >
                    Lägg till syssla
                  </BigButton>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <BigButton
                    theme={getTheme('dark')}
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={styles.bigButtonStyle}
                  >
                    Stäng
                  </BigButton>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const containerStyle = { backgroundColor: 'white', padding: 10 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    borderRadius: 10,
  },
  bigButtonStyle: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 0,
    borderColor: 'lightgrey',
  },
  bigButtonContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  radioButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
  },
});
