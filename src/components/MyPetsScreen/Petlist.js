import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import { obtenerMascotasUsuario } from '../../store/slices/pets';
import { PetListItem } from './PetListItem'
import { SkeletonPetList } from './SkeletonPetList';


export const Petlist = () => {

    const dispatch = useDispatch()
    const { isLoading, pets, selectedPet } = useSelector(state => state.pets);

    useEffect(() => {
        dispatch(obtenerMascotasUsuario())
    }, [selectedPet])

    return (
        isLoading
        ?(<SkeletonPetList />)
        :(
            (pets.length < 1)
            ? <View style={{ marginTop: 20 }}><Text>Aun no tienes mascotas</Text></View>
            : (
                <FlatList
                    style={styles.petListContainer}
                    contentContainerStyle={{ alignItems: 'center', paddingTop: 10, }}
                    data={pets}
                    renderItem={({ item }) => <PetListItem pet={item} />}
                    keyExtractor={(item) => item.uid}
                />
            )
        )
    )
}

const styles = StyleSheet.create({
    petListContainer: {
        marginTop: 15,
        flex: 1,
        width: "100%",
        paddingHorizontal: 27,
    }
})