import React, { useEffect, useState } from 'react'
import RNLocation from 'react-native-location';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Title } from '../components/LocationScreen/Title';
import { useSelector } from 'react-redux';
//import {GOOGLE_MAPS_KEY} from '@env'
export const LocationScreen = () => {

    const { location } = useSelector(state => state.auth);
  

    //image={{uri: 'custom_pin'}}
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                <Title />
            </Text>
            <View style={styles.containerMap}>
                {
                    (location.latitude && location.longitude)
                    ?(
                        <MapView style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            >
                                
                            <Marker coordinate={location} />
                        </MapView>
                    )
                    : <ActivityIndicator size='large' color='#000' />
                }
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
        textAlign: 'left',
        width: '90%',
        fontSize: 22,
        fontWeight: '800',
        color: 'black',
        marginVertical: 10,
    },
})