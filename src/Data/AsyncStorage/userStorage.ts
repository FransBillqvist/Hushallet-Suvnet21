import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../user';

export const saveUserStorage = async (user: User) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
    const keys = await AsyncStorage.getAllKeys();
    console.log('TUT TUUUUT HÄR KOMMER ASYNC STORAGEEEEE');
    console.log(keys);
    console.log('TUT TUUUUT HÄR KOMMER DET VI SMACKAR IN I ASYNC STORAGEEEEE');
    console.log(jsonValue);
  } catch (e) {
    console.log('Något gick fel, försök igen');
  }
  console.log('Done.');
};

export const getUserFromStorage = async () => {
  try {
    const getUser = await AsyncStorage.getItem('user');
    console.log('TUUUUTUUUUUUT HÄR KOMMER VAD SOM LAGRAS');
    console.log(getUser);
    return getUser != null ? JSON.parse(getUser) : null;
  } catch (e) {
    console.log('Kunde ej hämta denna användare');
  }
  console.log('Done.');
};
