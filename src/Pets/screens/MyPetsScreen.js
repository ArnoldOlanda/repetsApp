//@ts-check
import React from 'react'
import { Dimensions, StyleSheet, View, Image } from 'react-native'

import { Petlist } from '../components/Petlist';
import { Title } from '../../components/Title';
import { usePets } from '../hooks/usePets';
import { SearchBox } from '../components/SearchBox';


const windowWidth = Dimensions.get('screen').width

export const MyPetsScreen = () => {
    
    const { image } = usePets();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Title text='Mis Mascotas' icon='🐶' />
                <View>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.profilePhoto} 
                    />
                </View>
            </View>

            <SearchBox />

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
    profilePhoto:{
        width: 42,
        height: 42,
        borderRadius: 50
    }  
})