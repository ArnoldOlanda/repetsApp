import React from 'react'
import * as Location from 'expo-location';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
//import {GOOGLE_MAPS_KEY} from '@env'
export const MapScreen = () => {
    
    const [origin, setOrigin] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      console.log(current)
      setOrigin(current)
    }
    
    React.useEffect(() => {
        try{
        getLocationPermission();
        }catch(error){
            console.log(error)
        }

    },[])

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Mapa</Text>
        <View style={styles.containerMap}>
            <MapView style={styles.map}  
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta:0.09,
                longitudeDelta: 0.04
            }}/>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',  
    },
    map: {
        width: '100%',
        height: '100%',
    },
    containerMap: {
        width: '90%',
        height: '80%',
    },
    title: {
        textAlign:'left',
        width: '90%',
        fontSize: 22,
        fontWeight: '800',
        color: 'black',
        marginVertical: 10,
    },
})