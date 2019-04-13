import AsyncStorage from '@react-native-community/async-storage';

export const storeRecord = async (value) => {
  try {
    let items = await AsyncStorage.getItem('@records');
    items = JSON.parse(items);
    items.push(value);
    await AsyncStorage.setItem('@records', JSON.stringify(items));
  } catch (e) {
    console.log('error saving', e);
  }
}

export const deleteAllRecord = async () => {
  try {
    await AsyncStorage.removeItem('@records');
  } catch (e) {
    console.log('error saving', e);
  }
}

export const retrieveAllRecords = async () => {
  try {
    const items = await AsyncStorage.getItem('@records');
    return JSON.parse(items);
  } catch (e) {
    console.log('error saving', e);
  }
} 