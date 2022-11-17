/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import { AppState } from './AppState';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Notificacion en background data: ', remoteMessage.data);
})

AppRegistry.registerComponent(appName, () => AppState);
