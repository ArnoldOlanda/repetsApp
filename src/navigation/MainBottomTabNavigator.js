import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { FavoriteScreen, LocationScreen } from '../screens';
import { ProfileUserStack } from './ProfileUserStack';
import { ChatStack } from './ChatStack';
import { HomeScreenStack } from './HomeScreenStack';
import { ChatProvider } from '../context/ChatContext';


const Tab = createBottomTabNavigator();

export const MainBottomTabNavigator = () => {


    return (
        <ChatProvider>
            <Tab.Navigator
                sceneContainerStyle={{
                    backgroundColor: 'white'
                }}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        elevation: 0,
                        borderTopWidth: 0
                    },
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
                    }

                })}>
                <Tab.Screen name="Home" options={{ title: 'Explorar' }} component={HomeScreenStack} />
                <Tab.Screen name="Favorite" options={{ title: 'Favoritos' }} component={FavoriteScreen} />
                <Tab.Screen name="Location" options={{ title: 'Mapa' }} component={LocationScreen} />
                <Tab.Screen name="Messages" options={{ title: 'Mensajes' }} component={ChatStack} />
                <Tab.Screen name="Profile" options={{ title: 'Perfil' }} component={ProfileUserStack} />
            </Tab.Navigator>
        </ChatProvider>
    );
}