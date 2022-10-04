import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ProfileScreen, MyPetsScreen, MessagesScreen, ChatScreen } from '../screens';
import { RegisterPetScreen } from '../screens/RegisterPetScreen';

const Stack = createStackNavigator();


export const ChatStack = () => {

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
                headerShown: false
            }}
            
        >
            <Stack.Screen name='Message' component={ MessagesScreen } />
            <Stack.Screen name='Chat' component={ ChatScreen } />
            
        </Stack.Navigator>
    );
}