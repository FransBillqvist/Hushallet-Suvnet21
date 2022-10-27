import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import BigButton from '../Components/Buttons/BigButton';
import { getTheme } from '../Components/theme';
import { useTogglePasswordVisibility } from '../Hooks/useTogglePasswordVisibility';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getProfilesByUserId } from '../Store/profileSlice';
import { useAppDispatch } from '../Store/store';
import { login } from '../Store/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;

const logInValidationSchema = yup.object().shape({
  email: yup.string().email('Ogiltig email').required('Email är obligatoriskt'),
  password: yup.string().min(6, 'Minst 6 tecken').required('Lösenord är obligatoriskt'),
});

export default function StartScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={logInValidationSchema}
        onSubmit={async (values, actions) => {
          actions.resetForm();
          await dispatch(login(values))
            .unwrap()
            .then(async (value) => {
              if (value.uid !== undefined) {
                await dispatch(getProfilesByUserId(value.uid));
                navigation.navigate('ManagerScreen');
              }
            });
          console.log(values);
        }}
        initialValues={{ email: '', password: '' }}
      >
        {(props) => (
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <TextInput
                style={styles.inputTextField}
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
                label='Email'
              />
              <Text style={styles.errorMessage}>{props.touched.email && props.errors.email}</Text>
            </View>
            <View style={styles.inputStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.inputTextField, { flex: 1 }]}
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  onBlur={props.handleBlur('password')}
                  secureTextEntry={passwordVisibility}
                  label='Lösenord'
                />
                <Button
                  style={styles.buttonClass}
                  icon={rightIcon}
                  onPress={handlePasswordVisibility}
                >
                  {}
                </Button>
              </View>
              <Text style={styles.errorMessage}>
                {props.touched.password && props.errors.password}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <BigButton
                style={styles.bigButtonAlign}
                onPress={props.handleSubmit}
                theme={getTheme('dark')}
              >
                Logga In
              </BigButton>
              <Text style={styles.ellerText}>eller</Text>
              <BigButton
                theme={getTheme('dark')}
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                Skapa konto
              </BigButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
  },
  ellerText: {
    padding: 10,
    fontWeight: '700',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 6,
    textAlign: 'center',
  },
  buttonClass: {
    flex: 1,
    position: 'absolute',
    right: 0,
  },
  bigButtonAlign: {
    alignSelf: 'center',
  },
});
