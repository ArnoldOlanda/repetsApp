import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { MessagesScreen, ChatScreen } from '../screens';

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
                // headerShown: false
                
            }}
            initialRouteName='Message'
            
        >
            <Stack.Screen name='Message' options={{ headerShown: false }}   component={ MessagesScreen } />
            <Stack.Screen name="ChatScreen"  options={{ headerShown: false }} component={ ChatScreen } />
            
        </Stack.Navigator>
    );
}