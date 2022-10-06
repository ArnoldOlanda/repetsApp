import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation, setLocation } from '../store/slices/auth';

import { Title } from '../components/LocationScreen/Title';
import { Fab } from '../components/LocationScreen/Fab';
//import {GOOGLE_MAPS_KEY} from '@env'
export const LocationScreen = () => {

    const { location, currentLocation } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const mapViewRef = useRef(null);
    const following = useRef(true);
    const watchId = useRef(null);

    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                info => {

                    const { latitude, longitude } = info.coords;

                    const location = {
                        latitude,
                        longitude
                    };

                    resolve(location)
                    // dispatch(setLocation(location))
                },
                (err) => reject(err),
                { enableHighAccuracy: true }
            );
        })
    }

    const centerPosition = async () => {
        const { latitude, longitude } = await getCurrentLocation();

        mapViewRef.current.animateCamera({
            center: {
                latitude,
                longitude
            }
        })
        following.current = true
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {
                const location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                dispatch(setCurrentLocation(location))

            },
            err => console.log(err),
            { enableHighAccuracy: true, distanceFilter: 10 }
        )
    }

    const stopFollowUserLocation = () => {
        Geolocation.clearWatch(watchId.current)
    }

    useEffect(() => {

        getCurrentLocation()
            .then(location => {

                dispatch(setLocation(location))
                dispatch(setCurrentLocation(location))

            })
            .catch(console.log)

    }, [])

    useEffect(() => {
        if (!following.current) return;

        const { latitude, longitude } = currentLocation

        mapViewRef.current.animateCamera({
            center: { latitude, longitude }
        })

    }, [currentLocation])

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, [])

    //image={{uri: 'custom_pin'}}
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                <Title />
            </Text>
            <View style={styles.containerMap}>
                {
                    (location.latitude && location.longitude)
                        ? (
                            <View>
                                <MapView
                                    ref={el => mapViewRef.current = el}
                                    style={styles.map}
                                    showsUserLocation
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    onTouchStart={() => following.current = false}
                                    showsMyLocationButton={false}
                                >

                                    {/* <Marker coordinate={location} /> */}
                                </MapView>
                                <Fab
                                    iconName='compass-outline'
                                    onPress={ centerPosition }
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        right: 10
                                    }}
                                />
                            </View>
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