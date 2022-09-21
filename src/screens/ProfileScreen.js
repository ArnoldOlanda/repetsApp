import React from 'react'
import { Button, Text, View } from 'react-native'

export const ProfileScreen = ({ navigation }) => {


  return (
    <View>
        <Text>ProfileScreen</Text>
        <Button title='MyPetsScreen' onPress={()=> navigation.navigate('MyPets') } />
    </View>
  )
}