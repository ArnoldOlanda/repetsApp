import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

import { FavoriteScreen, LocationScreen } from '../screens';
import { ProfileUserStack } from './ProfileUserStack';
import { ChatStack } from './ChatStack';
import { HomeScreenStack } from './HomeScreenStack';
import { ChatProvider } from '../Messages/context/ChatContext';


const Tab = createBottomTabNavigator();

export const MainBottomTabNavigator = ({navigation}) => {

    const { colors } = useSelector( state => state.theme )
    const { newMessagesCount } = useSelector( state => state.messages )

    useEffect(() => {
      
        messaging().onNotificationOpenedApp( remoteMessage => {
            if(remoteMessage.data.type==='chat'){
                navigation.navigate('Messages')
            }
        } )

        messaging().getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                if(remoteMessage.data.type==='chat'){
                    navigation.navigate('Messages')
                }
            }
        });
      
    }, [])
    

    return (
        <ChatProvider>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        elevation: 0,
                        borderTopWidth: 0
                    },
                    tabBarActiveTintColor:colors.blue,
                    tabBarIcon: ({ color, focused, size }) => {
                       
                        let iconName = '';
                        switch (route.name) {
                            case 'Home':
                                iconName = 'home-outline'
                                break;

                            case 'Favorite':
                                iconName = 'heart-outline'
                                break;
                            case 'Location':
                                iconName = 'location-outline'
                                break;
                            case 'Messages':
                                iconName = 'chatbubble-ellipses-outline'
                                break;
                            case 'Profile':
                                iconName = 'person-outline'
                                break;
                        }
                        return <Icon name={iconName} size={25} color={color} />
                    },
                    

                })}>
                <Tab.Screen name="Home" options={{ title: 'Explorar' }} component={HomeScreenStack} />
                <Tab.Screen name="Favorite" options={{ title: 'Favoritos' }} component={FavoriteScreen} />
                <Tab.Screen name="Location" options={{ title: 'Mapa' }} component={LocationScreen} />
                <Tab.Screen 
                    name="Messages" 
                    options={{ 
                        title: 'Mensajes',
                        tabBarBadgeStyle:{
                            backgroundColor:'red',
                        },
                        tabBarBadge: newMessagesCount > 0 ? newMessagesCount:null 
                    }} 
                    component={ChatStack} 
                />
                <Tab.Screen name="Profile" options={{ title: 'Perfil',tabBarHideOnKeyboard: true, }} component={ProfileUserStack} />
            </Tab.Navigator>
        </ChatProvider>
    );
}