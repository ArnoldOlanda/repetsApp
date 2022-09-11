import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MainBottomTabNavigator } from './MainBottomTabNavigator';

import {
    ConfirmEmailScreen,
    LoginScreen,
    ResetPasswordScreen,
    StartScreen,
    WelcomeScreen,
    RegisterScreen
} from '../screens';
import { useSelector } from 'react-redux';



const Stack = createStackNavigator();

// TransitionPresets para importar los diferentes tipos de transiciones para el stack

export const MainStackNavigator = () => {

    const { status } = useSelector(state => state.auth);

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
            {
                (status === 'no-authenticated')
                ? (
                    <>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: '', headerShown: false }} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: '' }} />
                        <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} options={{ title: '' }} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }} />
                        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ title: '' }} />
                        <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: '' }} />
                    </>

                )
                :(
                    <>
                        <Stack.Screen name="MainBottomTab" options={{ headerShown: false }} component={MainBottomTabNavigator} />
                    </>
                )
            }

        </Stack.Navigator>
    );
}