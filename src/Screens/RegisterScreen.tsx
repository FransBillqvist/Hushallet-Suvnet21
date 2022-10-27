import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import BigButton from '../Components/Buttons/BigButton';
import { getTheme } from '../Components/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { registerUser } from '../Store/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

const logInValidationSchema = yup.object().shape({
  email: yup.string().email('Ogiltig email').required('Email är obligatoriskt'),
  password: yup.string().min(6, 'Minst 6 tecken').required('Lösenord är obligatoriskt'),
});

export default function RegisterScreen({ navigation }: Props) {
  const loggedInEmail = useAppSelector((state) => state.user.user?.email);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (loggedInEmail !== undefined) navigation.navigate('ManagerScreen');
    [loggedInEmail];
  });

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={logInValidationSchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          actions.resetForm();
          await dispatch(registerUser(values)).unwrap();
          navigation.navigate('ManagerScreen');
        }}
        initialValues={{ email: '', password: '' }}
      >
        {(props) => (
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <TextInput
                style={styles.inputTextField}
                label='Ange din email'
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
              />
              <Text style={styles.errorMessage}>{props.touched.email && props.errors.email}</Text>
            </View>
            <View style={styles.inputStyle}>
              <TextInput
                style={styles.inputTextField}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}
                label='Ange ditt lösenord'
              />
            </View>
            <Text style={styles.errorMessage}>
              {props.touched.password && props.errors.password}
            </Text>
            <View style={styles.buttonContainer}>
              <BigButton
                style={{ alignSelf: 'center' }}
                onPress={props.handleSubmit}
                theme={getTheme('dark')}
              >
                Registrera
              </BigButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 15,
    width: '100%',
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 15,
  },
  inputTextField: {
    borderRadius: 7,
    paddingHorizontal: 12,
    fontSize: 15,
    borderWidth: 1,
  },
  inputStyle: {
    marginTop: 10,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 45,
  },
  ellerText: {
    padding: 10,
    fontWeight: '700',
    fontSize: 18,
  },
});
