import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Title } from '../components/FavoriteScreen/Title';
import { PetHouseItem } from '../components/HomeScreen/PetHouseItem';

import img1 from './../assets/image1.png'
import img2 from './../assets/image2.png'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const FavoriteScreen = () => {

  return (
    <View style={styles.container}>
       <View style={styles.titleContainer}>
       <Text><Title /> </Text>
       </View>
      <ScrollView
        style={styles.petHousesListContainer}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <PetHouseItem imgSource={img1} favorite />
        <PetHouseItem imgSource={img2} favorite />
        <PetHouseItem imgSource={img1} favorite />
        <PetHouseItem imgSource={img2} favorite />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 39,
  },
  titleContainer:{
    width: windowWidth,
    paddingHorizontal:27
  },  
  petHousesListContainer: {
    marginTop: 16,
    width: windowWidth
  }
})