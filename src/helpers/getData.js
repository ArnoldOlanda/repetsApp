import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    try {

      const value = await AsyncStorage.getItem(key)

      if( value !== null ) return value;
      else return null;
      
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }
  