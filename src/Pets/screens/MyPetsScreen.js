import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { Petlist } from '../components/Petlist';
import { Title } from '../../components/Title';
import { obtenerMascotasUsuario } from '../../store/slices/pets/thunks';


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const MyPetsScreen = ({ navigation }) => {

    const { image } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(obtenerMascotasUsuario())
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Title text='Mis Mascotas' icon='🐶' />
                <View>
                    <Image source={{ uri: image }} style={{ width: 42, height: 42, borderRadius: 50 }} />
                </View>
            </View>

            <View style={styles.searchAddContainer}>
                <View style={styles.searchContainer}>
                    <Icon name='search-outline' size={30} color='#2782CA' style={{ marginLeft: 14 }} />
                    <TextInput style={{ flex: 1, paddingLeft: 10 }} placeholder='Buscar' />
                </View>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => navigation.navigate('RegisterPet')}
                >
                    <Icon name='add-outline' size={30} color='white' />
                </TouchableOpacity>
            </View>

            <Petlist />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 27
    },
    searchAddContainer: {
        marginTop: 16,
        width: windowWidth,
        height: 38,
        paddingHorizontal: 27,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2782CA',
        borderWidth: 1,
        borderRadius: 10,
    },
    searchButton: {

        width: 38,
        height: 38,
        borderColor: '#2782CA',
        backgroundColor:'#2782CA',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    
})