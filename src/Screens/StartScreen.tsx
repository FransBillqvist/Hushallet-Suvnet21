import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { login } from '../Store/userSlice';
import { auth } from '../Config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getTheme } from '../Components/theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTogglePasswordVisibility } from '../Hooks/useTogglePasswordVisibility';

type Props = NativeStackScreenProps<RootStackParamList, 'StartScreen'>;

const logInValidationSchema = yup.object().shape({
  email: yup.string().email('Ogiltig email').required('Email är obligatoriskt'),
  password: yup.string().min(6, 'Minst 6 tecken').required('Lösenord är obligatoriskt'),
});

export default function StartScreen({ navigation }: Props) {
  const { isLoading, errorMsg } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.inputContainer}>
  //       <View style={styles.inputStyle}>
  //         <Text style={styles.inputLabel}>Användarnamn</Text>
  //         <TextInput
  //           style={styles.inputTextField}
  //           value={email}
  //           onChangeText={setEmail}
  //           placeholder='Användarnamn'
  //         ></TextInput>
  //       </View>
  //       <View style={styles.inputStyle}>
  //         <Text style={styles.inputLabel}>Lösenord</Text>
  //         <TextInput
  //           style={styles.inputTextField}
  //           value={password}
  //           onChangeText={setPassword}
  //           placeholder='Lösenord'
  //         ></TextInput>
  //       </View>
  //     </View>
  //     <View style={styles.buttonContainer}>
  //       <BigButton theme={getTheme('dark')} onPress={() => dispatch(login({ email, password }))}>
  //         Logga In
  //       </BigButton>
  //       <Text style={styles.ellerText}>eller</Text>
  //       <BigButton theme={getTheme('dark')} onPress={() => navigation.navigate('RegisterScreen')}>
  //         Skapa konto
  //       </BigButton>
  //       {errorMsg && <Text>{errorMsg}</Text>}
  //     </View>
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={logInValidationSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          dispatch(login(values));
          console.log(values);
        }}
        initialValues={{ email: '', password: '' }}
      >
        {(props) => (
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <Text style={styles.inputLabel}>Användarnamn</Text>
              <TextInput
                style={styles.inputTextField}
                placeholder='Ange din email'
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
              />
              <Text style={styles.errorMessage}>{props.touched.email && props.errors.email}</Text>
            </View>
            <View style={styles.inputStyle}>
              <Text style={styles.inputLabel}>Lösenord</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.inputTextField, { flex: 1 }]}
                  placeholder='Ange ditt lösenord'
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  onBlur={props.handleBlur('password')}
                  secureTextEntry={passwordVisibility}
                />
                <Button
                  style={{ flex: 1, position: 'absolute', right: 0 }}
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
                style={{ alignSelf: 'center' }}
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
      {errorMsg && <Text>{errorMsg}</Text>}
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
    borderWidth: 1,
    borderRadius: 7,
    // borderColor: 'darkgrey',
    paddingHorizontal: 12,
    paddingVertical: 8,
    // backgroundColor: 'grey',
    fontSize: 15,
  },
  inputStyle: {
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 300,
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
});
