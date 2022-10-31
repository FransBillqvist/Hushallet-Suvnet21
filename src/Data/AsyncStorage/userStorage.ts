import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../user';

export const saveUserStorage = async (user: User) => {
  try {
    const jsonValue = JSON.stringify(user.uid);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    console.log('Något gick fel, försök igen ', e);
  }
  console.log('Done.');
};

export const getUserFromStorage = async () => {
  try {
    const getUser = await AsyncStorage.getItem('user');
    if (getUser) {
      const jsonValue = JSON.parse(getUser || '');
      return jsonValue;
    }
  } catch (e) {
    console.log('Kunde ej hämta denna användare ', e);
  }
  console.log('Done.');
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.log('Kunde ej logga ut ', e);
  }
};
