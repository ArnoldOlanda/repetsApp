import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../components/Button'
import { InputText } from '../components/InputText'
import { Modal } from '../components/RegisterPetScreen/Modal'
import { Title } from '../components/Title'
import { useForm } from '../hooks'

const windowWidth = Dimensions.get('window').width

const initialState = {
    nombre: '',
    tipoMascota: '',
    tamanioMascotas: 'Pequeños',
    tipoAlojamiento: 'Horas'
}

const formValidations = {
    nombre: [value => value.length >= 1, 'Este campo es obligatorio'],
    tipoMascota: [value => value.length >= 1, 'Este campo es obligatorio'],
    tamanioMascotas: [value => value.length >= 1, 'Este campo es obligatorio'],
    tipoAlojamiento: [value => value.length >= 1, 'Este campo es obligatorio'],
}

const tamanioMascotasOptions = ['Pequeños', 'Medianos', 'Grandes'];
const tipoAlojamientoOptions = ['Horas', 'Dias', 'Semanas'];

export const RegisterPetHouseScreen = () => {

    const { formState, formValidation, onInputTextChange, onResetForm } = useForm(initialState, formValidations)

    const { nombre, tipoMascota, tamanioMascotas, tipoAlojamiento } = formState
    const { nombreValid } = formValidation

    const [tipoMascotaModalVisible, setTipoMascotaModalVisible] = useState(false);

    const onCloseModalTipoMascota = () => {
        setTipoMascotaModalVisible(false);
    }

    const onSelectOptionTipoMascota = (option) => {
        onInputTextChange('tipoMascota', option)
    }

    return (
        <View style={styles.container}>
            <View style={{ width:windowWidth, paddingHorizontal: 27 }}><Title text='Registra tu Hospedaje' icon='🏠' /></View>
            <Text style={{ width:windowWidth, paddingHorizontal: 27 }}>Ingresa la informacion para tu hospedaje</Text>

            <ScrollView style={styles.formContainer}>
                <InputText
                    label='Nombre de tu hospedaje'
                    placeholder='Nombre del hospedaje'
                    onChangeText={onInputTextChange}
                    changeTextKey='nombre'
                    error={!!nombreValid}
                    errorMessage={nombreValid}
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Tipo de mascota</Text>
                    <TouchableOpacity
                        activeOpacity={ 0.6 }
                        style={styles.input}
                        onPress={() => setTipoMascotaModalVisible(true)}
                    >
                        {
                            (tipoMascota.length === 0)
                                ? <Text>Presione para elegir un tipo de mascota</Text>
                                : <Text>{tipoMascota}</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer} >
                    <Text style={styles.labelText} >Tamaño de mascotas permitidos</Text>
                    <View style={styles.buttonOptionsContainer}>
                        {
                            tamanioMascotasOptions.map(e => (
                                <TouchableOpacity
                                    activeOpacity={ 0.6 }
                                    key={e}
                                    style={tamanioMascotas === e ? styles.buttonOptionActive : styles.buttonOption}
                                    onPress={() => onInputTextChange('tamanioMascotas', e)}
                                >
                                    <Text style={tamanioMascotas === e ? styles.buttonOptionTextActive : {}} >{e}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

                <View style={styles.inputContainer} >
                    <Text style={styles.labelText} >Tipo de alojamiento que acepta</Text>
                    <View style={styles.buttonOptionsContainer}>
                        {
                            tipoAlojamientoOptions.map(e => (
                                <TouchableOpacity
                                    activeOpacity={ 0.6 }
                                    key={e}
                                    style={tipoAlojamiento === e ? styles.buttonOptionActive : styles.buttonOption}
                                    onPress={() => onInputTextChange('tipoAlojamiento', e)}
                                >
                                    <Text style={tipoAlojamiento === e ? styles.buttonOptionTextActive : {}} >{e}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text>Seleccione las fotos de su hospedaje</Text>
                    <View style={styles.galleryContainer}>

                    </View>
                </View>

                <Button 
                text='Registrar' 
                onPress={()=>{}} 
                stylesProps={{ marginTop: 51, width: windowWidth * 0.85 }}
                // isLoading
                />
            </ScrollView>

            <Modal
                modalFor='tipoMascota'
                visible={tipoMascotaModalVisible}
                onCloseModal={onCloseModalTipoMascota}
                onOptionSelected={onSelectOptionTipoMascota}
                modalHeight={230}
                currentOption={tipoMascota}   
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: windowWidth,
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
    labelText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19,
        color: '#000'
    }, 
    formContainer: {
        width: windowWidth,
        paddingHorizontal: 27,
        marginTop:10
    },
    buttonOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonOption: {
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        height: 33,
        paddingVertical: 5,
        width: 85,
        alignItems: 'center'
    },
    buttonOptionTextActive: {
        color: '#2782CA'
    },
    buttonOptionActive: {
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        height: 33,
        paddingVertical: 5,
        width: 85,
        borderWidth: 1,
        borderColor: '#2782CA',
        alignItems: 'center'
    },
    galleryContainer:{
        backgroundColor: '#ECF2F0',
        borderRadius: 5,
        marginBottom: 8,
        height: 108
    }
})
