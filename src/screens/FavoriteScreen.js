import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { PetHouseItem } from '../components/HomeScreen/PetHouseItem';
import { Title } from '../components/Title';

import img1 from './../assets/image1.png'
import img2 from './../assets/image2.png'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const FavoriteScreen = () => {

  const { isLoading } = useSelector(state => state.pethouses)
  const {favoritesPethouses} = useSelector( state => state.auth )
  const { colors } = useSelector( state => state.theme )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title text='Favoritos' icon='❤️' />
      </View>
      <ScrollView
        style={styles.petHousesListContainer}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      >
        {
          isLoading 
            ? <ActivityIndicator size='large' color='black' />
            : (
              favoritesPethouses.length < 1
                ? ( <Text style={{ color: colors.text2, fontSize: 20}}>Aun no tienes favoritos</Text> )
                : ( favoritesPethouses.map(e => (<PetHouseItem key={e.uid} data={e} favoriteScreen />)))
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
    paddingHorizontal: 27,
    width: windowWidth
  }
})