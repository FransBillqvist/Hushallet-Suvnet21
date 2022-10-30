import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, IconButton, Text, TextInput } from 'react-native-paper';
import BigButton from '../Components/Buttons/BigButton';
import AvatarCard from '../Components/Cards/AvatarCard';
import ChoreCard from '../Components/Cards/ChoreCard';
import { getTheme } from '../Components/theme';
import { Household } from '../Data/household';
import { Profile } from '../Data/profile';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { getChoreHistoryFromDbByChoreId, getDateWhenLatestDoneChoreHistoryWithChoreId } from '../Store/choreHistorySlice';
import { getASingleChore, getChores } from '../Store/choreSlice';
import { editHouseholdName, selectActiveHousehold } from '../Store/householdSlice';
import { getProfilesByProfileId, profileAlreadyInHousehold } from '../Store/profileSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;



export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const chores = useAppSelector((state) => state.chore);
  const householdId = useAppSelector((state) => state.household.singleHousehold?.id);
  const householdCode = useAppSelector((state) => state.household.singleHousehold?.code);
  const householdIddAsString = householdId as string;
  const householdCodeAsString = householdCode as string;
  const activeProfile = useAppSelector((state) => state.profile.currentProfile);
  const currentDate = new Date();
  const [originalHouseHold, editedHousehold] = React.useState<Household>({
    id: householdIddAsString,
    name: '',
    code: householdCodeAsString,
  });

      async function DaysPast<Array>(choreId: string) {
        try{
        // const choreInList = await dispatch(getChores(householdIddAsString)).unwrap();
        // const choreHistory = await dispatch(getChoreHistoryFromDbByChoreId(choreInList[0].id)).unwrap();
        const lastestChore = await dispatch(getDateWhenLatestDoneChoreHistoryWithChoreId(choreId)).unwrap();
        
        const choreDoneDate= new Date(lastestChore.date);
        const diffrenceInSec = Math.abs(currentDate.getTime() - choreDoneDate.getTime());
        const diffrenceInDays = Math.ceil(diffrenceInSec / (1000 * 3600 * 24));
        
        console.log(diffrenceInSec)
        console.log('ÄR RESULT');
        console.log(choreId)
        console.log(diffrenceInDays);
        
      
        const numberToString = diffrenceInDays.toString();
        if(diffrenceInSec < 86400000 )
        {
          DoneBy(choreId)
        } 
        const result: string[] = [numberToString];
        console.log(result);
        return result;
        // const result = diffrenceInDays.toString();
        // const numberOfDays: React.ElementType = () => {
        //   return <>{diffrenceInDays}</>;
        // };

        } catch (error) {
          console.log(error);
        }    
    }

    async function DoneBy<T>(choreId:string) {
      try{
        const choresDoneByProfile: Profile[] = [];
        const DateAsString = new Date().toISOString().slice(0, 10);
        const choreHistory = await dispatch(getChoreHistoryFromDbByChoreId(choreId)).unwrap();
        choreHistory.forEach(async element => {
          const forEachDate = new Date(element.date).toISOString().slice(0,10);
          console.log(forEachDate);
          if(forEachDate === DateAsString)
          {
            const profileFound = await dispatch(getProfilesByProfileId(element.profileId)).unwrap();
            choresDoneByProfile.push(profileFound);
          }
        });
        
        return choresDoneByProfile;
      }
      catch(error)
      {
        console.log(error);
      }
    }
    
  

  const handleHouseholdChange = (key: string, value: string | number) => {
    editedHousehold((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {chores.chores.map((chore) => {
            return (
              <View key={chore.id}>
                <Pressable
                  onPress={async () => {
                    await dispatch(selectActiveHousehold(householdIddAsString))
                      .unwrap()
                      .then(async () => {
                        await dispatch(getASingleChore(chore.id));
                        navigation.navigate('DetailScreen');
                      });
                  }}
                >
                  <ChoreCard chore={chore}>
                    <AvatarCard isActive={true} profile={(DaysPast(chore.id))}><>{DaysPast(chore.id)}</></AvatarCard>
                    <ScrollView>
                        <View>{}</View>
                      <Text>
                      </Text></ScrollView>
                    {activeProfile.role == 'owner' ? (
                      <IconButton
                        icon='pencil-outline'
                        onPress={() => navigation.navigate('EditChoreScreen', { id: chore.id })}
                      ></IconButton>
                    ) : (
                      <></>
                    )}
                  </ChoreCard>
                </Pressable>
              </View>
            );
          })}
        </View>
        <Button title='Lägg till en ny syssla' onPress={() => navigation.navigate('ChoreScreen')} />
      </View>

      <TextInput
        style={styles.input}
        outlineColor='transparent'
        mode='outlined'
        label='Titel'
        placeholder={originalHouseHold.name}
        value={originalHouseHold.name}
        onChangeText={(text: string) => handleHouseholdChange('name', text)}
      />

      <BigButton
        theme={getTheme('dark')}
        onPress={() => {
          dispatch(editHouseholdName(originalHouseHold));
          navigation.navigate('HomeScreen');
        }}
        style={{ marginTop: 10 }}
      >
        Spara ändringar
      </BigButton>
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
  },
});
