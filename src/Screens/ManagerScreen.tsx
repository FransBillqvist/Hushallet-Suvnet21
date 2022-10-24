import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import { Household } from '../Data/household';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getHouseHoldByCode } from '../Store/householdSlice';
import { profileAlreadyInHousehold } from '../Store/profileSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';
import { auth } from '../Config/firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'ManagerScreen'>;

export default function ManagerScreen({ navigation }: Props) {
  const [inviteCode, setInviteCode] = React.useState('');
  const [isHide, setIsHide] = React.useState(true);
  const buttonValue = isHide ? 'Gå med hushåll' : 'stäng';
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.uid);
  const userIdAsString = userId as string;

  return (
    <View style={styles.container}>
      <Text>Hushålls-skärm</Text>
      <Text>Knapp: Skapa nytt hushåll(ägare)</Text>
      <BigButton onPress={() => setIsHide(!isHide)}>{buttonValue}</BigButton>
      {isHide ? (
        <></>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder='kod'
            value={inviteCode}
            onChangeText={setInviteCode}
          ></TextInput>
          <BigButton
            onPress={async () => {
              const result = await dispatch(getHouseHoldByCode(inviteCode))
                .unwrap();
              if(result)
              {
                const profileExists  = await dispatch(profileAlreadyInHousehold([userIdAsString, result.id])).unwrap();
                if(profileExists){

                  navigation.navigate('HomeScreen');
                }
                else{
                  navigation.navigate('ProfileScreen');
                }
              }
              }}>
            Skicka förfrågan
          </BigButton>
        </>
      )}
      <Text>Lista med hushåll</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
