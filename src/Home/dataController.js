import AsyncStorage from '@react-native-community/async-storage';

const keys = ['@Vehicle Speed', '@Engine Temperature', '@Fuel Level', '@Revolution']

export const saveRecord = async ({ value, name }) => {
  try {
    if (isNaN(parseFloat(value))) return; // if value is incorrect
    let items = await AsyncStorage.getItem(`@${name}`);
    if (items === null) {
      items = "[]";
    }
    items = JSON.parse(items);
    items.push(parseFloat(value));
    if (items.length > 20) {
      items = items.slice(1);
    }
    await AsyncStorage.setItem(`@${name}`, JSON.stringify(items));
    return "success";
  } catch (e) {
    console.log('error saving', e);
  }
}

export const deleteRecords = async (type) => {
  try {
    await AsyncStorage.removeItem(`@${type}`);
  } catch (e) {
    console.log('error delete', e);
  }
}

export const retrieveRecords = async (type) => {
  try {
    let items = await AsyncStorage.getItem(`@${type}`);
    if (items === null) {
      items = "[]";
    }
    return JSON.parse(items);
  } catch (e) {
    console.log('error retrieve', e);
  }
} 

export const deleteAllRecords = async () => {
  try {
    await AsyncStorage.multiRemove(keys);
    return "success";
  } catch (e) {
    console.log('error delete', e);
  }
}

export const retrieveDataForMainPage = async () => {
  try {
    let result = [];
    for (key of keys) {
      let data = await retrieveRecords(key.replace('@', ''));
      data = data.map(point => {
        return { value: point, name: key.replace('@', '')}
      })
      result = [ ...result, ...data];
    }
    return result;
  } catch (e) {
    console.log('error retrieve all data' , e);
  }
}