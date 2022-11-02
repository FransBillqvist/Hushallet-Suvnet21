import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { customAlphabet } from 'nanoid';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import SmallButton from '../Components/Buttons/SmallButton';
import AvatarCard from '../Components/Cards/AvatarCard';
import { filterAvatarList } from '../Components/filterAvatarList';
import { getTheme } from '../Components/theme';
import { Profile } from '../Data/profile';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getChores } from '../Store/choreSlice';
import { addHouseholdToHouseholdList, createNewHousehold } from '../Store/householdSlice';
import { addNewProfile } from '../Store/profileSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const profileValidationSchema = yup.object().shape({
  profilename: yup
    .string()
    .min(2, 'Ditt profilnamn måste vara minst 2 tecken')
    .max(12, 'Inte mer än 12 tecken!')
    .required('Ett profilnamn är obligatoriskt!'),
});

export default function ProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.uid);
  const household = useAppSelector((state) => state.household.singleHousehold);
  const avatarsInHousehold: string[] = [];
  useAppSelector((state) =>
    state.profile.profiles
      .filter((profile) => profile.householdId === household?.id)
      .forEach((profile) => avatarsInHousehold.push(profile.avatar)),
  );
  const [chosenAvatar, setAvatar] = React.useState('');
  const nav = navigation.getState().routes.find((nav) => nav.name === 'CreateScreen');

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={profileValidationSchema}
        onSubmit={async (values, actions) => {
          try {
            actions.resetForm();
            const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);
            const householdMember = nav ? 'owner' : 'member';
            if (userId && household) {
              const newProfile: Profile = {
                id: nanoId(),
                userId: userId,
                name: values.profilename,
                avatar: chosenAvatar,
                role: householdMember,
                householdId: household.id,
              };

              if (householdMember == 'owner') dispatch(createNewHousehold(household));

              await dispatch(addNewProfile(newProfile)).unwrap();
              await dispatch(addHouseholdToHouseholdList(household));
              await dispatch(getChores(household.id));
              navigation.replace('HomeScreen');
            }
          } catch {
            console.error(Error);
          }
        }}
        initialValues={{ profilename: '' }}
      >
        {(props) => (
          <View style={styles.inputContainer}>
            <View style={styles.inputStyle}>
              <TextInput
                style={styles.inputTextField}
                onChangeText={props.handleChange('profilename')}
                value={props.values.profilename}
                onBlur={props.handleBlur('profile')}
                label='Profilnamn'
              />
              <Text style={styles.errorMessage}>
                {props.touched.profilename && props.errors.profilename}
              </Text>
            </View>

            <View style={styles.avatarCard}>
              {filterAvatarList(avatarsInHousehold).map((avatar, index) => (
                <AvatarCard
                  isActive={avatar === chosenAvatar}
                  key={index}
                  onTouchedEnd={() => {
                    setAvatar(avatar);
                  }}
                >
                  {avatar}
                </AvatarCard>
              ))}
            </View>
            <View>
              <SmallButton
                style={styles.button}
                icon='plus-circle-outline'
                theme={getTheme('light')}
                onPress={props.handleSubmit}
              >
                Skapa
              </SmallButton>
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
    padding: 20,
  },
  inputTextField: {
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  inputStyle: {
    marginTop: 10,
  },
  avatarCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    paddingHorizontal: 15,
    width: '100%',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 6,
    textAlign: 'center',
  },
});
