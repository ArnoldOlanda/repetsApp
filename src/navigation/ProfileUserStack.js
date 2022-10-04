import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { ProfileScreen, MyPetsScreen } from '../screens';
import { RegisterPetScreen } from '../screens/RegisterPetScreen';
import { DetailPetScreen } from '../screens/DetailPetScreen';

const Stack = createStackNavigator();


export const ProfileUserStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0
                },
                cardStyle: {
                    backgroundColor: '#ffffff',
                },
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <Stack.Screen name='MainProfile' options={{ headerShown: false }} component={ ProfileScreen } />
            <Stack.Screen name='MyPets' options={{ title:'' }} component={ MyPetsScreen } />
            <Stack.Screen name='RegisterPet' options={{ title:'' }} component={ RegisterPetScreen } />
            <Stack.Screen name='DetailPet' options={{ title:'' }} component={ DetailPetScreen } />
            
        </Stack.Navigator>
    );
}