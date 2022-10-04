import React, {useEffect} from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '../components/Avatar'
import { PetListItem } from '../components/MyPetsScreen/PetListItem';
import { Title } from '../components/Title';
import { obtenerMascotasUsuario } from '../store/slices/pets/thunks';


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const MyPetsScreen = ({ navigation }) => {

    const { image } = useSelector( state => state.auth )
    const { pets } = useSelector(state => state.pets);
    const dispatch = useDispatch();

    useEffect(() => {
      
        dispatch( obtenerMascotasUsuario() )

    }, [])
   

  return (
    <View style={styles.container}>
        <View style={ styles.titleContainer }>
            <Title text='Mis Mascotas' icon='🐶' />
            <View>
                <Image source={{ uri:image }} style={{ width:42, height:42, borderRadius:50 }}/>
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

        {
            (pets.length < 1)
            ? <View style={{ marginTop: 20 }}><Text>Aun no tienes mascotas</Text></View>
            :(
                <FlatList 
                style={ styles.petListContainer }
                contentContainerStyle={{ alignItems: 'center', paddingTop: 10, }}
                data={ pets }
                renderItem={ ({item}) => <PetListItem pet={ item } />}
                keyExtractor={ (item) => item.uid }
                />
            )
        }
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
        paddingHorizontal: 27,
    }
})