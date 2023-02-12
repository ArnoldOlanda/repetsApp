import React, { useEffect, useRef, useState } from 'react'
import { PermissionsAndroid ,TouchableOpacity,Dimensions,ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation, setLocation } from '../store/slices/auth';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab } from '../components/LocationScreen/Fab';
import { Modal } from '../components/LocationScreen/Modal'
import { Title } from '../components/Title'

import { setCurrentPethouse } from '../store/slices/pethouses/pethousesSlice';
import { SearchBox } from '../components/LocationScreen/SearchBox';
//import {GOOGLE_MAPS_KEY} from '@env'

const windowWidth = Dimensions.get('screen').width
const categories = ['Perros', 'Gatos', 'Pajaros', 'Otros'];

export const LocationScreen = ({ navigation }) => {
    async function requestGeolocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Ridesharer Geolocation Permission',
              'message': 'Ridesharer needs access to your current location so you can share or search for a ride'
            });
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the geolocation")
          } else {
            console.log("Geolocation permission denied")
          }
        } catch (err) {
          console.warn(err)
        }
      }

    const [category, setCategory] = useState('Perros');

    const onSelectCategory = (option) => {
        setCategory(option);
    }

    const { location, currentLocation } = useSelector(state => state.auth);
    const { pethouses, selectedPethouse } = useSelector(state => state.pethouses);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
        navigation.navigate("DetailPethouse")
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
            { enableHighAccuracy: true, distanceFilter: 10, maximumAge: 0 }
        )
    }

    const stopFollowUserLocation = () => {
        Geolocation.clearWatch(watchId.current)
    }

    
    useEffect(() => {
        requestGeolocationPermission();
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


    return (
        <View style={styles.container}>
            
            <View style={{flex:1, justifyContent: 'space-between',}}>
                <SearchBox/>
                {/*
                <Text style={styles.title}>
                    <Title text='Mapa' icon='🗺️'/>
                </Text>
                */
                }
                <View style={styles.buttonCategoriesContainer}>
                    <TouchableOpacity style={{
                        ...styles.buttonCategory,
                        backgroundColor: '#ECF2F0',
                    }}>
                        <Icon name='options-outline' size={30} color='#000' />
                    </TouchableOpacity>
                    {
                        categories.map(e => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={e}
                                onPress={() => onSelectCategory(e)}
                                style={{
                                    ...styles.buttonCategory,
                                    backgroundColor: category === e ? '#2782CA' : '#ECF2F0',
                                }}>
                                <Text style={{
                                    ...styles.categoryText,
                                    color: category === e ? '#fff' : '#000',
                                }} >{e}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            <View style={styles.containerMap}>
                
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

                        {
                            pethouses.map((e) => (
                                <Marker
                                    key={e.uid}
                                    image={{uri: 'custom_pin' }}
                                    coordinate={{
                                        latitude: Number(e.coordenadas.latitud),
                                        longitude: Number(e.coordenadas.longitud)
                                    }}
                                    onPress={() => {
                                        dispatch(setCurrentPethouse(e))
                                        setIsOpen(true)
                                    }}
                                />
                            ))
                        }

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
            {
                (selectedPethouse && Object.keys(selectedPethouse).length > 0)
                && (
                    <Modal
                        data={selectedPethouse}
                        onCloseModal={closeModal}
                        visible={isOpen}
                        modalHeight={230}
                        buttonCloseText='Ir a pethouse'
                    />
                )
                }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 39,
        paddingHorizontal: 27,
        flexDirection: 'column',
        
    },
    map: {
        width: '100%',
        height: '100%',
    },
    containerMap: {
        flex: 4,
        width: '100%',
        //height: '50%',
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: 'blue',
        marginVertical: 15
    },
    title: {
        textAlign: 'left',
        width: '90%',
        fontSize: 22,
        fontWeight: '800',
        color: 'black',
        marginVertical: 10,
    },
   
    buttonCategoriesContainer: {
        paddingHorizontal: 27,
        flexDirection: 'row',
        justifyContent: 'space-between',
       
    },
    buttonCategory: {
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        color: '#000'
    },
})