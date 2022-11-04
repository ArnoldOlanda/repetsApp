import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { HomeScreen } from '../screens';
import { DetailPehouseScreen } from '../screens/DetailPehouseScreen';
import { ReservationScreen } from '../screens/ReservationScreen';



const Stack = createStackNavigator();


export const HomeScreenStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0
                },
                cardStyle: {
                    backgroundColor: '#ffffff',
                },
                ...TransitionPresets.SlideFromRightIOS,
                
            }}
        >
            <Stack.Screen name='HomeScreen' options={{ headerShown: false }} component={ HomeScreen } />
            <Stack.Screen name='DetailPethouse' options={{ headerShown: false }} component={ DetailPehouseScreen } />
            <Stack.Screen name='ReservationPethouse' options={{ title:'' }} component={ ReservationScreen } />
            
        </Stack.Navigator>
    );
}