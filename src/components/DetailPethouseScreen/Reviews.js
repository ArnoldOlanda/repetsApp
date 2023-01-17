import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const reviewsData=[
    {
        user:'Enrique',
        califation:'5',
        review:'Excelente servicio , 100% recomendado ☺️'
    },
    {
        user:'Alejandro',
        califation:'4.7',
        review:'Muy cuidadosos y cariñosos con las mascotas. De primera'
    },
    {
        user:'Gregorio',
        califation:'4.2',
        review:'Buena atención recomendaciones'
    }
]

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Reviews = () => {
  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
        {
            reviewsData.map( e =>(
                <View key={e.user} style={styles.reviewCardContainer}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                        <Text style={{...styles.textBold, fontSize:14}}>{ e.user }</Text>
                        <Text style={styles.textBold}><Icon name='star' style={{paddingLeft:10}} /> {e.califation}</Text>
                    </View>
                    <Text>{ e.review }</Text>
                </View>
            ))
        }
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    reviewCardContainer:{
        backgroundColor:'white',
        marginHorizontal:10,
        marginVertical:5,
        paddingHorizontal:5,
        width:windowWidth * 0.33,
        height:130,
        borderWidth:1,
        borderColor:'#2782CA',
        borderRadius:5,
        elevation:3
    },
    textBold:{
        fontSize:16,
        fontWeight:'600',
        lineHeight:20,
        color:'black'
    },
    textRegular:{
        fontWeight:'300',
        lineHeight:17,
        fontSize:16
    }
})