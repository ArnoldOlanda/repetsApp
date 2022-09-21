import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from '../components/Button'
import { Modal } from '../components/RegisterPetScreen/Modal'
import { Title } from '../components/Title'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

export const RegisterPetScreen = () => {

    const [tipoMascotaModalVisible, setTipoMascotaModalVisible] = useState(false);
    const [tipoMascotas, setTipoMascotas] = useState([]);

    const [caracteristicaMascotaModalVisible, setCaracteristicaMascotaModalVisible] = useState(false);
    const [caracteristicaMascota, setCaracteristicaMascota] = useState([]);

    const onCloseModalTipoMascota = () => {
        setTipoMascotaModalVisible(false);
    }

    const onCloseModalCaracteristicaMascota = () => {
        setCaracteristicaMascotaModalVisible(false);
    }

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Title text='Registra a tu mascota' icon='🐶' />
                <Text style={{ color: '#B7B7B7', fontWeight: '400', lineHeight: 19 }}> Agrega a tu nueva mascota </Text>
            </View>

            <ScrollView style={styles.formContainer}>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Nombre</Text>
                    <TextInput style={styles.input} placeholder='Su nombre' />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Tipo de mascota</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setTipoMascotaModalVisible(true)}
                    >
                        {
                            (tipoMascotas.length === 0)
                                ? <Text>Presione para elegir un tipo de mascota</Text>
                                : tipoMascotas.map(e => (
                                    <Text>{e}</Text>
                                ))
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Raza</Text>
                    <TextInput style={styles.input} placeholder='Raza de su mascota' />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Años</Text>
                    <TextInput style={styles.input} placeholder='Edad de su mascota' />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Descripcion de la mascota</Text>
                    <TextInput style={styles.input} placeholder='Descripcion corta de su mascota' />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Caracteristicas</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setCaracteristicaMascotaModalVisible(true)}
                    >
                        {
                            (caracteristicaMascota.length === 0)
                                ? <Text>Presione para seleccionar</Text>
                                : caracteristicaMascota.map(e => (
                                    <Text>{e}</Text>
                                ))
                        }
                    </TouchableOpacity>
                </View>
                <Button text='Registrar' stylesProps={{ marginTop: 51, width: windowWidth * 0.85 }} />
                <View style={{ height: 10 }} />
            </ScrollView>

            <Modal
                modalFor='tipoMascota'
                visible={tipoMascotaModalVisible}
                onCloseModal={onCloseModalTipoMascota}
                modalHeight={230}
            />

            <Modal
                modalFor='caracteristicaMascota'
                visible={ caracteristicaMascotaModalVisible }
                onCloseModal={ onCloseModalCaracteristicaMascota }
                modalHeight={330}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: windowWidth,
        marginTop: 15
    },
    titleContainer: {
        width: windowWidth,
        paddingHorizontal: 27,
        height: 50,
        marginBottom: 11
    },
    formContainer: {
        width: windowWidth,
        paddingHorizontal: 27
    },
    labelText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19,
        color: '#000'
    },
    input: {
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        height: 33,
        paddingLeft: 13,
        paddingVertical: 5
    },
    inputContainer: {
        marginBottom: 8
    },
})
