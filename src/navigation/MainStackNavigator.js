
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { GoogleSignin, } from '@react-native-google-signin/google-signin';
import { useSelector } from 'react-redux';
import { checkLocationPermision } from '../helpers/checkLocationPermision';

import { MainBottomTabNavigator } from './MainBottomTabNavigator';
import { WelcomeScreen } from '../Auth/screens/WelcomeScreen';
import { RegisterScreen } from '../Auth/screens/RegisterScreen';
import { ConfirmEmailScreen } from '../Auth/screens/ConfirmEmailScreen';
import { LoginScreen } from '../Auth/screens/LoginScreen';
import { ResetPasswordScreen } from '../Auth/screens/ResetPasswordScreen';
import { StartScreen } from '../Auth/screens/StartScreen';



const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};


const Stack = createStackNavigator();



export const MainStackNavigator = () => {

    const { status } = useSelector(state => state.auth);

    useEffect(() => {
        const unsuscribe = AppState.addEventListener('change', state =>{
            // console.log(state)
            if(state !== 'active') return;

            checkLocationPermision();
            
        });
        
        return () => {
            unsuscribe.remove();
        }

    }, [])
    

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
                headerStyle: { elevation: 0 },
            }}
        >
            {
                (status === 'no-authenticated')
                ? (
                    <>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}
                            options={{
                                title: '',
                                headerShown: false,
                                transitionSpec: {
                                    open: config,
                                    close: config,
                                },
                            }} />
                        <Stack.Screen
                            name="RegisterScreen"
                            component={RegisterScreen}
                            options={{ title: '', ...TransitionPresets.SlideFromRightIOS }}
                        />

                        <Stack.Screen
                            name="ConfirmEmailScreen"
                            component={ConfirmEmailScreen}
                            options={{ title: '', ...TransitionPresets.SlideFromRightIOS }}
                        />

                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={{ title: '', ...TransitionPresets.SlideFromRightIOS }}
                        />

                        <Stack.Screen
                            name="ResetPasswordScreen"
                            component={ResetPasswordScreen}
                            options={{ title: '', ...TransitionPresets.SlideFromRightIOS }}
                        />

                        <Stack.Screen
                            name="StartScreen"
                            component={StartScreen}
                            options={{ title: '', ...TransitionPresets.SlideFromRightIOS }}
                        />
                    </>

                )
                : (
                    <>
                        <Stack.Screen
                            name="MainBottomTab"
                            component={MainBottomTabNavigator}
                            options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
                        />
                    </>
                )
            }

        </Stack.Navigator>
    );
}