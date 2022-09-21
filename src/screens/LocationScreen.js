import React from 'react'
import RNLocation from 'react-native-location';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Title } from '../components/LocationScreen/Title';
//import {GOOGLE_MAPS_KEY} from '@env'
export const LocationScreen = () => {
    
    const [origin, setOrigin] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

     
    RNLocation.configure({
    distanceFilter: 5.0
    })
    
    const getLocationPermission = async () => {

        RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
            detail: "coarse"
        }
        }).then(granted => {
            if (granted) {
                RNLocation.getLatestLocation({ timeout: 60000 })
                .then(latestLocation => {
                    setOrigin({
                        latitude: latestLocation["latitude"],
                        longitude: latestLocation["longitude"],
                    })
                })
            }
        })
        RNLocation.getLatestLocation({ timeout: 60000 })
        .then(latestLocation => {
            setOrigin({
                latitude: latestLocation["latitude"],
                longitude: latestLocation["longitude"],
            })
        })
        
    }
    
    React.useEffect(() => {
        try{
        getLocationPermission();
        }catch(error){
            console.log(error)
        }

    },[])

 //image={{uri: 'custom_pin'}}
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            <Title/>
        </Text>
        <View style={styles.containerMap}>
            <MapView style={styles.map}  
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta:0.09,
                longitudeDelta: 0.04
            }}>
                <Marker
                    coordinate={{ latitude : origin.latitude , longitude : origin.longitude }}
                    
                />
            </MapView>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        paddingTop: 39, 
    },
    map: {
        width: '100%',
        height: '100%',
    },
    containerMap: {
        width: '90%',
        height: '90%',
        overflow: 'hidden',
        borderRadius: 10,
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