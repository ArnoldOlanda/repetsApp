import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { PetHouseItem } from '../components/HomeScreen/PetHouseItem';
import { Title } from '../components/Title';

import img1 from './../assets/image1.png'
import img2 from './../assets/image2.png'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const FavoriteScreen = () => {

  const { pethouses, isLoading } = useSelector(state => state.pethouses)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title text='Favoritos' icon='🖤' />
      </View>
      <ScrollView
        style={styles.petHousesListContainer}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {
          isLoading ? <ActivityIndicator size='large' color='black' />
            : (
              pethouses.map(e => (
                <PetHouseItem key={e.uid} data={e} />
              ))
            )
        }
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
  titleContainer: {
    width: windowWidth,
    paddingHorizontal: 27
  },
  petHousesListContainer: {
    marginTop: 16,
    width: windowWidth
  }
})