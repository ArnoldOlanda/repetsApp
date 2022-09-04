import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteScreen } from '../screens/FavoriteScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export const MainBottomTabNavigator = () => {

    return (
        <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor:'white'
        }}
        screenOptions={{
            headerShown:false,
            tabBarStyle:{
                elevation:0,
                borderTopWidth:0
            }
            
        }}>
            <Tab.Screen name="Home" options={{title:'Explorar'}} component={ HomeScreen } />
            <Tab.Screen name="Favorite" options={{title:'Favoritos'}} component={ FavoriteScreen } />
        </Tab.Navigator>
    );
}