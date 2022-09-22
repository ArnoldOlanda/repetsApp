import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import ReacNativeModal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "../Button";

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const Modal = ({ modalFor, visible, onCloseModal, onOptionSelected, modalHeight }) => {

    return (
        <View style={{ flex: 1 }}>

            <ReacNativeModal
                style={{ margin: 0, justifyContent: 'flex-end', alignItems: 'center' }}
                isVisible={visible}
                onBackButtonPress={onCloseModal}
                animationOutTiming={400}
                backdropTransitionOutTiming={500}
                onSwipeComplete={onCloseModal}
                swipeDirection="down"
                backdropOpacity={0.2}
            >
                <View style={{...styles.modalContainer, height: modalHeight}}>
                    <View style={{ width: 35, height: 0, borderWidth: 4, borderColor: '#2782CA', borderRadius: 10, marginVertical: 5 }} />
                    {
                        (modalFor === 'tipoMascota')
                            ? (
                                <View style={styles.optionsContainer}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Perro 🐶</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Gato 🐱</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Loro 🦜</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Otro</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            : (
                                <View style={styles.optionsContainer}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Alegre</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Enojon</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Sociable</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Agresivo</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Curioso</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Jugueton</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Activo</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText} >Amigable</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                    }
                    <Button
                        text='Hecho'
                        stylesProps={{ width: windowWidth * 0.8, }}
                        onPress={onCloseModal}
                    />
                </View>
            </ReacNativeModal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        width: windowWidth * 0.95,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderWidth: 1,
        borderColor: '#2782CA',
        paddingTop: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    optionsContainer: {
        width: windowWidth * 0.8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        width: 122,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2782CA',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        color: '#2782CA'
    }
})