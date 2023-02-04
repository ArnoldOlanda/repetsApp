import React, { useEffect } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { MessagesScreen, ChatScreen } from '../Messages/screens';
import { useDispatch } from 'react-redux';
import { resetNewMessagesCount } from '../store/slices/messages/messagesSlice';

const Stack = createStackNavigator();


export const ChatStack = ({navigation}) => {
    const dispatch = useDispatch();
   
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('tabPress', (e) => {
    //         // Prevent default behavior
    //         e.preventDefault();
    //         dispatch( resetNewMessagesCount() )
        
    //       });
        
    //       return unsubscribe;
    
    // }, [navigation])
    

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0
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