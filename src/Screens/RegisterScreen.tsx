import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { registerUser } from '../Store/userSlice';
import * as yup from 'yup';
import BigButton from '../Components/Buttons/BigButton';
import { getTheme } from '../Components/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

const logInValidationSchema = yup.object().shape({
  email: yup.string().email('Ogiltig email').required('Email är obligatoriskt'),
  password: yup.string().min(6, 'Minst 6 tecken').required('Lösenord är obligatoriskt'),
});

export default function RegisterScreen({ navigation }: Props) {
  const { isLoading, errorMsg } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <View>
      <Formik
        validationSchema={logInValidationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm();
          dispatch(registerUser(values));
        }}
        initialValues={{ email: '', password: '' }}
      >
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Ange din email'
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              onBlur={props.handleBlur('email')}
            />
            <Text style={styles.errorMessage}>{props.touched.email && props.errors.email}</Text>
            <TextInput
              style={styles.input}
              placeholder='Ange ditt lösenord'
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              onBlur={props.handleBlur('password')}
            />
            <Text style={styles.errorMessage}>
              {props.touched.password && props.errors.password}
            </Text>
            <BigButton
              style={{ alignSelf: 'center' }}
              onPress={props.handleSubmit}
              theme={getTheme('dark')}
            >
              Registrera
            </BigButton>
          </View>
        )}
      </Formik>
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    top: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    minWidth: 300,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});
