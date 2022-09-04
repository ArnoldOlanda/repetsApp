import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from '../components/HomeScreen/Avatar'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.locationContainer} ><Text>Ubicacion ic</Text></View>
        <View style={styles.titleWithAvatarContainer}>
            <View style={{
                flexDirection:'row',
                alignItems:'center'
            }}>
                <Text style={styles.distritoText}>Sachaca,</Text>
                <Text style={styles.ciudadText}> AQP</Text>
            </View>
            <View>
                <Avatar />
            </View>
        </View>
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Categorias</Text>
            <Text style={{color:'#F8CF50'}}>Ver todos ic </Text>
        </View>
        <View style={styles.buttonCategoriesContainer}>
            {
                ['ic','Perros','Gatos','Pajaros','Peces'].map(e=>(
                    <TouchableOpacity 
                    key={e} 
                    style={{
                        ...styles.buttonCategory,
                        backgroundColor: e === 'Perros' ? '#2782CA':'#ECF2F0',
                    }}>
                        <Text style={{
                            ...styles.categoryText,
                            color: e === 'Perros' ? '#fff':'#000',
                        }} >{ e }</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        paddingTop:39
    },
    locationContainer:{
        paddingHorizontal:27,
        width: windowWidth,
    },
    titleWithAvatarContainer:{
        paddingHorizontal:27,
        width: windowWidth,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    distritoText:{
        fontSize:20,
        lineHeight:24.2,
        fontWeight:'800',
        color:'#000'
    },
    ciudadText:{
        fontSize:20,
        lineHeight:24.2,
        fontWeight:'400',
        color:'#000'
    },
    categoryContainer:{
        width: windowWidth,
        paddingHorizontal:27,
        marginBottom:6,
        marginTop:6,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    buttonCategoriesContainer:{
        width: windowWidth,
        paddingHorizontal:27,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    buttonCategory:{
        backgroundColor:'#ECF2F0',
        borderRadius: 5,
        height: 44,
        paddingHorizontal:4,
        justifyContent:'center'
    },
    categoryText:{
        fontSize:14,
        fontWeight:'500',
        lineHeight:20,
        color:'#000'
    }
})