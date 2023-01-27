import React,{ useEffect } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';

import { ChatScreen, HomeScreen } from '../screens';
import { DetailPehouseScreen } from '../screens/DetailPehouseScreen';
import { ReservationStepsScreen } from '../screens/ReservationStepsScreen';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIncomingNotificationStatus, setNewNotification } from '../store/slices/notifications/notificationSlice';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { checkSubscriptionStatus } from '../helpers/checkSubscriptionStatus';


const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

export const HomeScreenStack = () => {

    const { uid } = useSelector(state => state.auth);
    const {} = useSelector(state=> state.notification)
    const dispatch = useDispatch();

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {

        const { data, notification } = remoteMessage;

        dispatch(setNewNotification({
            title:notification.title, 
            body: notification.body ,
            data
        }))
    })

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const { data, notification } = remoteMessage;

            dispatch(setNewNotification({
                title:notification.title, 
                body: notification.body ,
                data
            }))
            dispatch( setIncomingNotificationStatus(true) )
        });
    
        return unsubscribe;
    }, []);

    useEffect(() => {
      
        checkSubscriptionStatus(uid)

    }, [])
    

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { elevation: 0 },
                //...TransitionPresets.SlideFromRightIOS,                
            }}
        >
            <Stack.Screen name='HomeScreen' options={{ headerShown: false }} component={ HomeScreen } />
            <Stack.Screen name='DetailPethouse' options={{ headerShown: false }} component={ DetailPehouseScreen } />
            <Stack.Screen name="ChatScreen"  options={{ headerShown: false }} component={ ChatScreen } />
            <Stack.Screen 
                name='ReservationStepsScreen' 
                options={{ 
                    title:'',
                    headerShown: windowHeight < 600 ? false: true ,
                    // headerShown: false 
                }} 
                component={ ReservationStepsScreen } 
            />
            <Stack.Screen name='Notifications' options={{headerShown: false}} component={ NotificationsScreen } />
            {/* <Stack.Screen name='ReservationPethouse' options={{ title:'' }} component={ ReservationScreen } /> */}
            
        </Stack.Navigator>
    );
}