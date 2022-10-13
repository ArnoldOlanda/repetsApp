import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation, setLocation } from '../store/slices/auth';

import { Title } from '../components/LocationScreen/Title';
import { Fab } from '../components/LocationScreen/Fab';
import { Modal } from '../components/LocationScreen/Modal'
//import {GOOGLE_MAPS_KEY} from '@env'
export const LocationScreen = () => {

    const { location, currentLocation } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
    }
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
                // console.log('volviendo a tener acceso a la ubi')
                const location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                dispatch(setCurrentLocation(location))
            },
            err => console.log(err),
            { enableHighAccuracy: true, distanceFilter: 10, maximumAge:0 }
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
            .catch(err => {
                console.log(err);
                const location = {
                    latitude: 0,
                    longitude: 0
                }
                dispatch(setLocation(location))
                dispatch(setCurrentLocation(location))
            })

    }, [])

    useEffect(() => {
        if (!following.current) return;

        const { latitude, longitude } = currentLocation

        mapViewRef.current?.animateCamera({
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
                <View>
                    <MapView
                        ref={el => mapViewRef.current = el}
                        style={styles.map}
                        showsUserLocation={location.latitude !== 0 && location.longitude !== 0}
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

                        <Marker
                            image={require('../assets/images/marker3.png')}
                            coordinate={{
                                latitude: -16.416955248690588,
                                longitude: -71.50859011767815
                            }}
                            onPress={() => (setIsOpen(true))}
                        />

                    </MapView>
                    <Fab
                        iconName='compass-outline'
                        onPress={centerPosition}
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10
                        }}
                    />
                </View>
            </View>
            <Modal
                onCloseModal={closeModal}
                visible={isOpen}
                modalHeight={230}
            />
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