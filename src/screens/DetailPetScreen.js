import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export const DetailPetScreen = () => {

    const { selectedPet } = useSelector( state => state.pets );

  return (
    <View>
        <Text>DetailPetScreen</Text>
        <Text>{ JSON.stringify(selectedPet,null,4) }</Text>
        
    </View>
  )
}
