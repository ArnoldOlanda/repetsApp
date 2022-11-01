import messaging from '@react-native-firebase/messaging';


export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

const GetFCMToken = async () => {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken")
    console.log({oldtoken: fcmtoken});

    if(!fcmtoken){
        try {
            let fcmtoken = messaging().getToken();

            if(fcmtoken){
                console.log({newtoken: fcmtoken});
                // await AsyncStorage.setItem("fcmtoken",fcmtoken)
                
            }
        } catch (error) {
            console.log("Error en el token ", error);
        }
    }
} 