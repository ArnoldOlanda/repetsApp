import React, {useEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';

import {setCurrentLocation, setLocation} from '../store/slices/auth';
import {ProfileScreen} from '../screens';
import {
  RegisterPetScreen,
  DetailPetScreen,
  MyPetsScreen,
} from '../Pets/screens';
import {UpdateUserInfo} from '../screens/UpdateUserInfoScreen';
import {RegisterPetHouseScreen} from '../Pethouses/screens/RegisterPetHouseScreen';

const Stack = createStackNavigator();

export const ProfileUserStack = () => {
  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        info => {
          const {latitude, longitude} = info.coords;

          const location = {
            latitude,
            longitude,
          };

          resolve(location);
          // dispatch(setLocation(location))
        },
        err => reject(err),
        {enableHighAccuracy: true},
      );
    });
  };

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        dispatch(setLocation(location));
        dispatch(setCurrentLocation(location));
      })
      .catch(err => {
        console.log(err);
        const location = {
          latitude: 0,
          longitude: 0,
        };
        dispatch(setLocation(location));
        dispatch(setCurrentLocation(location));
      });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {elevation: 0},
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="MainProfile"
        options={{headerShown: false}}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="UpdateUserInfo"
        options={{title: ''}}
        component={UpdateUserInfo}
      />
      <Stack.Screen
        name="RegisterPethouse"
        options={{
          headerShown: true,
          title:'Registra tu Hospedaje 🏠',
          headerTitleStyle:{fontSize:22, fontWeight: '800'}
        }}
        component={RegisterPetHouseScreen}
      />

      <Stack.Screen
        name="MyPets"
        options={{
          headerShown: true,
          title:'Mis Mascotas 🐶',
          headerTitleStyle:{fontSize:22, fontWeight: '800'}
        }}
        component={MyPetsScreen}
      />
      <Stack.Screen
        name="RegisterPet"
        options={{
          headerShown: true,
          title:'Registra a tu mascota 🐶',
          headerTitleStyle:{fontSize:22, fontWeight: '800'}
        }}
        component={RegisterPetScreen}
      />
      <Stack.Screen
        name="DetailPet"
        options={{title: '', headerShown: false}}
        component={DetailPetScreen}
      />
    </Stack.Navigator>
  );
};
