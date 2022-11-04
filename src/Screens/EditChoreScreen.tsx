import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import * as yup from 'yup';
import BigButton from '../Components/Buttons/BigButton';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { ChoreCreate } from '../Data/chore';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { editChore } from '../Store/choreSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

const formValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-ö A-Ö]+$/, 'Accepterar bara bokstäver')
    .min(3, 'Minst 3 bokstäver')
    .max(20, 'Max 20 bokstäver')
    .required('Namn är obligatoriskt'),
  description: yup
    .string()
    .matches(/^[a-ö A-Ö,.]+$/, 'Accepterar bara bokstäver')
    .min(5, 'Minst 5 bokstäver')
    .max(50, 'Max 50 bokstäver')
    .required('Beskrivning är obligatoriskt'),
});

type EditChoreScreenProp = RouteProp<RootStackParamList, 'EditChoreScreen'>;
type Props = NativeStackScreenProps<RootStackParamList, 'EditChoreScreen'>;

export default function EditChoreScreen({ navigation }: Props) {
  const route = useRoute<EditChoreScreenProp>();
  const { id } = route.params;
  const chores = useAppSelector((state) => state.chore.chores);
  const specificChore = chores.find((chore) => chore.id === id);
  const dispatch = useAppDispatch();
  const [demandingValue, setDemandingValue] = React.useState('');
  const [frequencyValue, setFrequencyValue] = React.useState('');
  const [demandingVisible, setDemandingVisible] = React.useState(false);
  const [frequencyVisible, setFrequencyVisible] = React.useState(false);
  const showDemandingModal = () => setDemandingVisible(true);
  const hideDemandingModal = () => setDemandingVisible(false);
  const showFrequencyModal = () => setFrequencyVisible(true);
  const hideFrequencyModal = () => setFrequencyVisible(false);

  const [originalchore, editedChore] = React.useState<ChoreCreate>({
    // behöver lösa object is possibly undefined varningarna, fungerar i övrigt!
    id: id,
    name: specificChore?.name || '',
    description: specificChore?.description || '',
    demanding: specificChore?.demanding || 0,
    frequency: specificChore?.frequency || 0,
    householdId: specificChore?.householdId || '',
  });

  const handleChange = (key: string, value: string | number) => {
    editedChore((prev) => ({ ...prev, [key]: value }));
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
            originalchore.name = values.name;
            originalchore.description = values.description;
            handleChange('name', values.name);
            handleChange('description', values.description);
            dispatch(editChore(originalchore));
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
                  placeholder={originalchore.name}
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
                  placeholder={originalchore.description}
                  value={props.values.description}
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                />
              </ChoreCard>
              <Text style={styles.errorMessage}>
                {props.touched.description && props.errors.description}
              </Text>
              <Pressable onPress={showFrequencyModal}>
                <ChoreCard style={{ minHeight: 70 }}>
                  <Text>Återkommer</Text>
                  <Text>Var {originalchore.frequency.toString()}:e Dag</Text>
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
                </ChoreCard>
              </Pressable>
              <Pressable onPress={showDemandingModal}>
                <ChoreCard style={{ minHeight: 70 }}>
                  <Text>Energivärde:</Text>
                  <Text>{originalchore.demanding.toString()}</Text>
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
                </ChoreCard>
              </Pressable>
              <BigButton
                theme={getTheme('light')}
                onPress={props.handleSubmit}
                style={{ marginTop: 10 }}
              >
                Spara ändringar
              </BigButton>
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
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modal: {
    backgroundColor: 'white',
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
    flexDirection: 'row',
  },
});
