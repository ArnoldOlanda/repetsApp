//@ts-check
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { ArrowBack, Configuration } from './Icons'

export const HeaderChat = ({ currentRecipient }) => {
    const navigation = useNavigation();
    const { pethouse, user, avatar } = currentRecipient

    return (
        <View style={styles.headerChat}>

            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <ArrowBack />
            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                <Image style={styles.avatarImage} source={{ uri: avatar }} />
                <View>
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                        {
                            pethouse
                                ? pethouse.nombre
                                : `${user.nombre} ${user.apellido}`
                        }
                    </Text>
                    <Text>{pethouse ? 'Tu hosting' : 'Cliente'}</Text>
                </View>
            </View>

            <View style={{
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Configuration />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    headerChat: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#B7B7B76B"
    },
    avatarImage: {
        width: 38,
        height: 38,
        marginRight: 5,
        borderRadius: 30
    },
})