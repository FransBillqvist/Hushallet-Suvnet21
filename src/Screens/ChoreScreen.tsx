import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import * as yup from 'yup';
import SmallButton from '../Components/Buttons/SmallButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { ChoreCreate } from '../Data/chore';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { addChoreHistoryToDb } from '../Store/choreHistorySlice';
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
    demanding: 1,
    frequency: 1,
    householdId: householdIdAsString,
  });
  const handleChange = (key: string, value: string | number) => {
    newChore((prev) => ({ ...prev, [key]: value }));
  };

  const frequency =
    '1, 2, 3,4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30'.split(
      ',',
    );

  const demanding = '1, 2, 3,4, 5,6,7,8'.split(',');

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
            const historyDummy = {
              id: '-' + nanoId(10),
              choreId: chore.id,
              date: new Date().toISOString(),
              profileId: 'null',
            };
            dispatch(addChoreHistoryToDb(historyDummy));
            navigation.navigate('HomeScreen');
          }}
          initialValues={{ name: '', description: '' }}
        >
          {(props) => (
            <View style={styles.container}>
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
              </ChoreCard>
              <Text style={styles.errorMessage}>{props.touched.name && props.errors.name}</Text>
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
              </ChoreCard>
              <Text style={styles.errorMessage}>
                {props.touched.description && props.errors.description}
              </Text>
              <View>
                <ChoreCard>
                  <Text>Återkommer</Text>
                  <Text>Var {chore.frequency.toString()}:e Dag</Text>
                  <Portal>
                    <Modal
                      visible={frequencyVisible}
                      onDismiss={hideFrequencyModal}
                      contentContainerStyle={styles.modal}
                    >
                      <WheelPickerExpo
                        height={200}
                        width={150}
                        selectedStyle={{ borderColor: 'red', borderWidth: 2 }}
                        initialSelectedIndex={5}
                        items={frequency.map((freq) => ({ label: freq, value: Number }))}
                        onChange={({ item }) => setFrequencyValue(item.label)}
                      />
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
                      contentContainerStyle={styles.modal}
                    >
                      <WheelPickerExpo
                        height={200}
                        width={150}
                        selectedStyle={{ borderColor: 'red', borderWidth: 2 }}
                        initialSelectedIndex={5}
                        items={demanding.map((dem) => ({ label: dem, value: Number }))}
                        onChange={({ item }) => setDemandingValue(item.label)}
                      />
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

              <View style={styles.smallButtonContainer}>
                <View style={styles.smallButtonPosition}>
                  <SmallButton theme={getTheme('dark')} onPress={props.handleSubmit}>
                    Lägg till
                  </SmallButton>
                  <SmallButton
                    theme={getTheme('dark')}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    Stäng
                  </SmallButton>
                </View>
              </View>
            </View>
          )}
        </Formik>
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
  textInputContainer: {
    paddingHorizontal: 12,
  },
  input: {
    width: '100%',
    borderRadius: 10,
  },
  smallButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
  },
  smallButtonPosition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
  },
  modal: {
    backgroundColor: 'white',
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
