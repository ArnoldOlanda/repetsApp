import React, { useState, useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import profileDefault from '../assets/profile_default.jpg'
import { startLoadPethouses } from '../store/slices/pethouses/thunks';

import { PetHouseItem } from '../components/HomeScreen/PetHouseItem'
import { SkeletonPethousesList } from '../components/HomeScreen/SkeletonPethousesList';

// import { ChatBot } from '../components/HomeScreen/ChatBot';

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

const categories = ['Perros', 'Gatos', 'Pajaros', 'Otros'];

export const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { image, uid } = useSelector(state => state.auth);
    const { colors } = useSelector(state => state.theme);
    const { pethouses, isLoading } = useSelector(state => state.pethouses);

    const [category, setCategory] = useState('Perros');
    const [refreshPethouses, setRefreshPethouses] = useState(false);


    const onSelectCategory = (option) => {
        setCategory(option);
    }

    const onRefreshPethouses = () => {
        setRefreshPethouses(true)
        dispatch(startLoadPethouses())
        setRefreshPethouses(false)
    }


    useEffect(() => {
        dispatch(startLoadPethouses())
    }, [])


    return (
        <View style={styles.container}>

            <View style={styles.locationContainer} >
                <Text style={{ color: colors.text2 }}>Ubicacion <Icon name='chevron-down-outline' size={15} color='#2782CA' /> </Text></View>
            <View style={styles.titleWithAvatarContainer}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{ ...styles.distritoText, color: colors.text }}>Sachaca,</Text>
                    <Text style={{ ...styles.ciudadText, color: colors.text }}> AQP</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Icon name='search' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        style={{ width: 40, justifyContent:'center', alignItems:'flex-end' }}
                        onPress={()=> navigation.navigate('Notifications') }
                    >
                        <Icon name='notifications' size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categories section */}
           
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

            <ScrollView
                style={styles.petHousesListContainer}
                contentContainerStyle={{ alignItems: 'center' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshPethouses}
                        onRefresh={onRefreshPethouses}
                    />
                }>
                {
                    isLoading
                        ? (<SkeletonPethousesList />)
                        : /*(pethouses.filter(ele => (ele.propietario._id != uid))
                            .map(e => (<PetHouseItem key={e.uid} data={e} />))
                        )*/
                        pethouses.map(e => (<PetHouseItem key={e.uid} data={e} />))


                }
            </ScrollView>
            {/* <ChatBot /> */}
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
        marginBottom: 15
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
        paddingHorizontal: 10,
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
        width: windowWidth,
        paddingHorizontal: 27,
    },
})