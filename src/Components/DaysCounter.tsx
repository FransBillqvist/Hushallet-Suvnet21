import { Profile } from "../Data/profile";
import { getDateWhenLatestDoneChoreHistoryWithChoreId, getChoreHistoryFromDbByChoreId } from "../Store/choreHistorySlice";
import { getProfilesByProfileId } from "../Store/profileSlice";
import { useAppDispatch } from "../Store/store";
import {Text} from 'react-native';
import * as React from 'react-native';
import { ChoreHistory } from "../Data/choreHistory";

// const choreInList = await dispatch(getChores(householdIddAsString)).unwrap();
// const choreHistory = await dispatch(getChoreHistoryFromDbByChoreId(choreInList[0].id)).unwrap();
// if(diffrenceInSec < 86400000 )
// {
//   DoneBy(choreId)
// } 

// const result: Promise<string> = Promise.resolve('').then((value)=>value.numberToString));


export async function getThunkData(choreId:string) {
    const dispatch = useAppDispatch();
    const lastestChore = await dispatch(getDateWhenLatestDoneChoreHistoryWithChoreId(choreId)).unwrap();
    return lastestChore.date;

    
    
}
interface Props
{
    choreId:string;
}

export default function DaysPast(props:Props) {
    const currentDate = new Date();
    // const dispatch = useAppDispatch();

    // const test = getThunkData(choreId);
    
    getThunkData(props.choreId).then((value) => {
        const lastestChoreDate = new Date(value);
    

    // const resolvedChore = (await Promise.resolve(lastestChore)).date
    // console.log('resolved: ' + resolvedChore);
    // resolvedChore.then((value) =>{console.log('Resolved' + value)})
    
    // const choreDoneDate= new Date(lastestChore);
    const diffrenceInSec = Math.abs(currentDate.getTime() - lastestChoreDate.getTime());
    const diffrenceInDays = Math.ceil(diffrenceInSec / (1000 * 3600 * 24));
    
    console.log('ÄR RESULT');
    console.log(props.choreId)
    // console.log(diffrenceInDays);
    const numberToString = diffrenceInDays.toString();

    const result = numberToString;
    // Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
    console.log(result);
    if(result == null)
    {
        return (<Text>0</Text>)
    }
    return (<Text>{result}</Text>);
    });
}

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


