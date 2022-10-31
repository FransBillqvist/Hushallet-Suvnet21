import { Profile } from '../Data/profile';
import {
  getDateWhenLatestDoneChoreHistoryWithChoreId,
  getChoreHistoryFromDbByChoreId,
} from '../Store/choreHistorySlice';
import { getProfilesByProfileId } from '../Store/profileSlice';
import { useAppDispatch } from '../Store/store';
import { Text } from 'react-native';
import * as ReactRN from 'react-native';
import * as React from 'react';
import { ChoreHistory } from '../Data/choreHistory';

async function getThunkData(choreId: string) {
  const dispatch = useAppDispatch();
  const lastestChore = await dispatch(
    getDateWhenLatestDoneChoreHistoryWithChoreId(choreId),
  ).unwrap();

  return lastestChore.date.toString();
}
interface Props {
  choreId: string;
  children?: React.ReactNode | React.ReactNode[];
}
let result = '';
const DaysPast = (props: Props) => {
  const currentDate = new Date();
  getThunkData(props.choreId).then((value) => {
    const lastestChoreDate = new Date(value);
    const diffrenceInSec = Math.abs(currentDate.getTime() - lastestChoreDate.getTime());
    const diffrenceInDays = Math.round(diffrenceInSec / (1000 * 3600 * 24));
    const numberToString = diffrenceInDays.toString();
    console.log('NumberToString: ');
    console.log(numberToString);
    result = numberToString;
  });

  console.log(result);
  if (result != null) {
    return <Text>{result}</Text>;
  }
  return <Text>Tyvärr ingen data</Text>;
};

export { DaysPast, getThunkData };

// async function DoneBy(choreId:string) {
//   try{
//     const choresDoneByProfile: Profile[] = [];
//     const DateAsString = new Date().toISOString().slice(0, 10);
//     const choreHistory = await dispatch(getChoreHistoryFromDbByChoreId(choreId)).unwrap();
//     choreHistory.forEach(async element => {
//       const forEachDate = new Date(element.date).toISOString().slice(0,10);
//       console.log(forEachDate);
//       if(forEachDate === DateAsString)
//       {
//         const profileFound = await dispatch(getProfilesByProfileId(element.profileId)).unwrap();
//         choresDoneByProfile.push(profileFound);
//       }
//     });

//     return choresDoneByProfile;
//   }
//   catch(error)
//   {
//     console.log(error);
//   }
