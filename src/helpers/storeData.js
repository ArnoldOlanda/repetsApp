import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key = '', value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log(e);
  }
}

export const getStoreData = async(key = '') => {
  try {
    
    const value = await AsyncStorage.getItem(key)

    return value

  } catch (error) {
    console.log(error);    
  }
}