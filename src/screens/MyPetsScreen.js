import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { Avatar } from '../components/Avatar'
import { PetListItem } from '../components/MyPetsScreen/PetListItem';
import { Title } from '../components/Title';


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const MyPetsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View style={ styles.titleContainer }>
            <Title text='Mis Mascotas' icon='🐶' />
            <View>
                <Avatar />
            </View>
        </View>

        <View style={styles.searchAddContainer}>
            <View style={styles.searchContainer}>
                <Icon name='search-outline' size={30} color='#2782CA' style={{ marginLeft:14 }} />
                <TextInput style={{ flex: 1, paddingLeft:10 }} placeholder='Buscar' />
            </View>
            <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation.navigate('RegisterPet')}
            >
                <Icon name='add-outline' size={30} color='#2782CA' />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.petListContainer} contentContainerStyle={{ alignItems: 'center' }}>
            {
                [1,2,3,4,5,6].map((e,i)=> (
                    <PetListItem key={ e } />
                ))
            }
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    titleContainer:{
        width: windowWidth,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        paddingHorizontal: 27
    },
    searchAddContainer:{
        marginTop:16,
        width: windowWidth,
        height: 38,
        paddingHorizontal: 27,
        flexDirection: 'row',
        alignItems:'center'
    },
    searchContainer:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        borderColor: '#2782CA',
        borderWidth: 1,
        borderRadius: 10,
    },
    searchButton:{
        
        width: 38,
        height: 38,
        borderColor: '#2782CA',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:10
    },
    petListContainer:{
        marginTop:15,
        flex: 1,
        width: windowWidth,
        paddingHorizontal: 27
    }
})