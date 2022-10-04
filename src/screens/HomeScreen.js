import React, { useEffect } from 'react'
import { Button, Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/Ionicons';

import img1 from './../assets/image1.png'
import img2 from './../assets/image2.png'
import { logout } from '../store/slices/auth';

import { Avatar } from '../components/Avatar'
import { PetHouseItem } from '../components/HomeScreen/PetHouseItem'
import { resetStorePets } from '../store/slices/pets';

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const HomeScreen = ({ navigation }) => {

    const { image } = useSelector( state => state.auth );
    
    const dispatch = useDispatch();

    const onPressGoogleSignOut = async () => {
        try {
            await GoogleSignin.signOut();
            dispatch( logout({error:''}) );
            dispatch( resetStorePets() );
            //this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Button title='cerrar sesion(prueba) ' onPress={ onPressGoogleSignOut } />
            <View style={styles.locationContainer} >
                <Text>Ubicacion <Icon name='chevron-down-outline' size={15} color='#2782CA' /> </Text>
            </View>
            <View style={styles.titleWithAvatarContainer}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={styles.distritoText}>Sachaca,</Text>
                    <Text style={styles.ciudadText}> AQP</Text>
                </View>
                <View>
                    <Image source={{uri:image}} style={{ width:42, height: 42, borderRadius:50 }} />
                </View>
            </View>
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>Categorias</Text>
                <Text style={{ color: '#F8CF50' }}>Ver todos <Icon name='chevron-forward-circle' size={15} /> </Text>
            </View>
            <View style={styles.buttonCategoriesContainer}>
                <TouchableOpacity style={{
                    ...styles.buttonCategory,
                    backgroundColor: '#ECF2F0',
                }}>
                    <Icon name='options-outline' size={30} color='#000' />
                </TouchableOpacity>
                {
                    ['Perros', 'Gatos', 'Pajaros', 'Peces'].map(e => (
                        <TouchableOpacity
                            key={e}
                            style={{
                                ...styles.buttonCategory,
                                backgroundColor: e === 'Perros' ? '#2782CA' : '#ECF2F0',
                            }}>
                            <Text style={{
                                ...styles.categoryText,
                                color: e === 'Perros' ? '#fff' : '#000',
                            }} >{e}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <ScrollView style={styles.petHousesListContainer} contentContainerStyle={{ alignItems: 'center' }}>
                <PetHouseItem imgSource={img1} />
                <PetHouseItem imgSource={img2} />
                <PetHouseItem imgSource={img1} />
                <PetHouseItem imgSource={img2} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 39
    },
    locationContainer: {
        paddingHorizontal: 27,
        width: windowWidth,
    },
    titleWithAvatarContainer: {
        paddingHorizontal: 27,
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    distritoText: {
        fontSize: 20,
        lineHeight: 24.2,
        fontWeight: '800',
        color: '#000'
    },
    ciudadText: {
        fontSize: 20,
        lineHeight: 24.2,
        fontWeight: '400',
        color: '#000'
    },
    categoryContainer: {
        width: windowWidth,
        paddingHorizontal: 27,
        marginBottom: 6,
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonCategoriesContainer: {
        width: windowWidth,
        paddingHorizontal: 27,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonCategory: {
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 4,
        justifyContent: 'center'
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        color: '#000'
    },
    petHousesListContainer: {
        marginTop: 16,
        width: windowWidth
    }
})