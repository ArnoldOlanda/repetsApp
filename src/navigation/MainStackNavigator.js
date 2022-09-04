import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MainBottomTabNavigator } from './MainBottomTabNavigator';

import { ConfirmEmailScreen } from '../screens/ConfirmEmailScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import { StartScreen } from '../screens/StartScreen';



const Stack = createStackNavigator();

// TransitionPresets para importar los diferentes tipos de transiciones para el stack

export const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#ffffff'
                },
                ...TransitionPresets.SlideFromRightIOS
            }}
            
        >
            <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} options={{title:''}} />
            
            <Stack.Screen name="StartScreen" component={StartScreen} options={{title:''}}/>

            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title:''}}/>

            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{title:''}}/>

            <Stack.Screen name="MainBottomTab" options={{headerShown: false }} component={MainBottomTabNavigator} />
        </Stack.Navigator>
    );
}