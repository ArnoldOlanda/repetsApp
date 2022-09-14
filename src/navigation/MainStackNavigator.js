import React, { useEffect } from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MainBottomTabNavigator } from './MainBottomTabNavigator';

import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import { useSelector } from 'react-redux';

import {
    ConfirmEmailScreen,
    LoginScreen,
    ResetPasswordScreen,
    StartScreen,
    WelcomeScreen,
    RegisterScreen
} from '../screens';



const Stack = createStackNavigator();

// TransitionPresets para importar los diferentes tipos de transiciones para el stack

export const MainStackNavigator = () => {

    const { status } = useSelector(state => state.auth);

    useEffect(() => {
      
        GoogleSignin.configure({
            androidClientId: '621326626181-5feqjqd642e25peqk3p12uke1bofr6th.apps.googleusercontent.com',
            webClientId: '621326626181-t80didd4oom94vbbq23v3k0jtc5ir3je.apps.googleusercontent.com'
            //iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
        });

    }, [])
    

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