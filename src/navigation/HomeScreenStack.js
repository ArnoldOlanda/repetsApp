import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { ChatScreen, HomeScreen } from '../screens';
import { DetailPehouseScreen } from '../screens/DetailPehouseScreen';
import { ReservationScreen } from '../screens/ReservationScreen';
import { ReservationStepsScreen } from '../screens/ReservationStepsScreen';
import { Dimensions } from 'react-native';


const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();


export const HomeScreenStack = () => {

    // console.log(windowHeight);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { elevation: 0 },
                ...TransitionPresets.SlideFromRightIOS,                
            }}
        >
            <Stack.Screen name='HomeScreen' options={{ headerShown: false }} component={ HomeScreen } />
            <Stack.Screen name='DetailPethouse' options={{ headerShown: false }} component={ DetailPehouseScreen } />
            <Stack.Screen name="ChatScreen"  options={{ headerShown: false }} component={ ChatScreen } />
            <Stack.Screen name='ReservationStepsScreen' options={{ title:'',headerShown: windowHeight < 530 ? false: true }} component={ ReservationStepsScreen } />
            <Stack.Screen name='ReservationPethouse' options={{ title:'' }} component={ ReservationScreen } />
            
        </Stack.Navigator>
    );
}