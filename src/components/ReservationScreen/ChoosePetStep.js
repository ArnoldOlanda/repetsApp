import React, { useEffect, useState } from 'react'
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import petListItem from '../../assets/petListItemNone.png'
import { SkeletonPetList } from '../MyPetsScreen/SkeletonPetList'


export const ChoosePetStep = ({ onUpdate, currentSelected }) => {

    const { colors } = useSelector(state => state.theme)
    const { pets, isLoading } = useSelector(state => state.pets)


    const [selected, setSelected] = useState(currentSelected)

    const onSelectPet=(uid)=>{
        setSelected(uid)
        onUpdate('mascota', uid)
    }

   
    

    const PetListITem = ({ pet }) => (
        <TouchableOpacity 
        activeOpacity={1}
        style={pet.uid === selected ? {...styles.petListItemContainer, borderColor:colors.blue}:styles.petListItemContainer}
        onPress={()=> onSelectPet(pet.uid) }
        >
            {
                pet.uid===selected 
                && (
                <View style={styles.selectedView}>
                    <View style={{ width:40,height:40, backgroundColor:colors.blue,borderRadius:20,justifyContent:'center',alignItems:'center' }}>
                        <Icon name='checkmark' size={30} color='white' />
                    </View>
                </View>)
            }
            <Image source={{ uri: pet.img}} style={{ width: 244, height:150 }} />
            <View style={{ height:27,paddingLeft:10, backgroundColor:colors.card, justifyContent:'center' }}>
                <Text style={{color:colors.gray, fontSize:16}} >{ pet.nombre }</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <ScrollView
        contentContainerStyle={{alignItems:'center'}}
        style={{ flex:1 }}
        >
            <Text style={{ marginVertical:10, color:colors.text2, fontSize:18, fontWeight:'800' }}>Selecciona tu mascota</Text>
            {
                (isLoading)
                ? (  <SkeletonPetList />)
                : ((pets.length < 1)
                    ? <Text>No tienes mascotas registradas</Text>
                    : pets.map(e=>(
                        <PetListITem key={e.uid} pet={e} />
                )))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    petListItemContainer: {
        position:'relative',
        overflow: 'hidden',
        width: 244,
        height: 177,
        marginBottom: 23,
        borderRadius: 10,
        elevation: 4,
        borderWidth:1,
        borderColor:'transparent'
    },
    selectedView:{
        width:244,
        height:177,
        backgroundColor:'rgba(250,250,250,0.4)', 
        position:'absolute', 
        top:0,
        left:0,
        zIndex:100,
        justifyContent:'center',
        alignItems:'center'
    }
})