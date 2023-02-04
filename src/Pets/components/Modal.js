import React from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ReacNativeModal from "react-native-modal";

import { Button } from "../../components/Button";
import { optionsCaracteristicasMascota, optionsTipoMascota } from "../data/modalOptions";

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export const Modal = ({ modalFor, visible, onCloseModal, onOptionSelected, modalHeight, currentOption }) => {

    return (
        <View style={{ flex: 1 }}>

            <ReacNativeModal
                style={{ margin: 0, justifyContent: 'flex-end', alignItems: 'center' }}
                isVisible={visible}
                onBackButtonPress={onCloseModal}
                backdropTransitionOutTiming={0}
                onSwipeComplete={onCloseModal}
                swipeDirection="down"
                backdropOpacity={0.5}
                useNativeDriver={true}
            >
                <View style={{ ...styles.modalContainer, height: modalHeight }}>
                    <View style={{ width: 35, height: 0, borderWidth: 4, borderColor: '#2782CA', borderRadius: 10, marginVertical: 5 }} />
                    {
                        (modalFor === 'tipoMascota')
                            ? (
                                <View style={styles.optionsContainer}>
                                    {
                                        optionsTipoMascota.map(e => (
                                            <TouchableOpacity
                                            key={e}
                                            style={currentOption === e ? styles.buttonSelected : styles.button}
                                            onPress={() => onOptionSelected(e)}>
                                                <Text style={styles.buttonText} >{e}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            )
                            : (
                                <View style={styles.optionsContainer}>
                                    {
                                        optionsCaracteristicasMascota.map( e => (
                                            <TouchableOpacity
                                            key={e}
                                            style={currentOption.find(el => el === e) ? styles.buttonSelected : styles.button}
                                            onPress={() => onOptionSelected(e)}
                                            >
                                                <Text style={styles.buttonText} >{ e }</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
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
        justifyContent: 'center',
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
        marginHorizontal: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        color: '#2782CA'
    },
    buttonSelected: {
        width: 122,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
        backgroundColor: '#ECF2F0',
        marginHorizontal: 10
    }
})