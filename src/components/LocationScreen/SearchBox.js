//@ts-check
import React from 'react'
import { StyleSheet,Dimensions, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('screen').width

export const SearchBox = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.searchAddContainer}>
            <View style={styles.searchContainer}>
                <Icon name='search-outline' size={30} color='#2782CA' style={{ marginLeft: 14 }} />
                <TextInput style={{ flex: 1, paddingLeft: 10 }} placeholder='Buscar' />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: '#2782CA',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
})