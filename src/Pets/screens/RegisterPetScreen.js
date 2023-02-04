
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native'

import { Button } from '../../components/Button'
import { Modal } from '../components/Modal'
import { Title } from '../../components/Title'
import { useRegisterPet } from '../hooks/useRegisterPet'
import { InputText } from '../../components/InputText'

const windowWidth = Dimensions.get('screen').width

export const RegisterPetScreen = () => {

    const {
        isLoading,
        formState,
        formValidation,
        formSubmitted,
        onInputTextChange,
        tipoMascotaModalVisible,
        caracteristicasModalVisible,
        setTipoMascotaModalVisible,
        setCaracteristicasModalVisible,
        onCloseModalTipoMascota,
        onCloseModalCaracteristicaMascota,
        onSelectOptionTipoMascota,
        onSelectOptionCaracteristicaMascota,
        onPressRegisterButton,
    } = useRegisterPet();


    const { nombre, tipoMascota, raza, edad, descripcion, caracteristicasMascota } = formState
    const { nombreValid, razaValid, edadValid, descripcionValid } = formValidation

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Title text='Registra a tu mascota' icon='🐶' />
                <Text style={{ color: '#B7B7B7', fontWeight: '400', lineHeight: 19 }}>
                    Agrega a tu nueva mascota
                </Text>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <ScrollView
                    style={styles.formContainer}
                    keyboardShouldPersistTaps="handled"
                >

                    <InputText
                        label='Nombre'
                        value={nombre}
                        onChangeText={onInputTextChange}
                        changeTextKey='nombre'
                        placeholder='Nombre de la mascota'
                        error={!!nombreValid && formSubmitted}
                        errorMessage={nombreValid}
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Tipo de mascota</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                // Keyboard.dismiss
                                setTipoMascotaModalVisible(true);
                            }}
                        >
                            {
                                (tipoMascota.length === 0)
                                    ? <Text>Presione para elegir un tipo de mascota</Text>
                                    : <Text>{tipoMascota}</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <InputText
                        label='Raza'
                        value={raza}
                        onChangeText={onInputTextChange}
                        changeTextKey='raza'
                        placeholder='Raza de la mascota'
                        error={!!razaValid && formSubmitted}
                        errorMessage={razaValid}
                    />

                    <InputText
                        label='Años'
                        value={edad}
                        onChangeText={onInputTextChange}
                        changeTextKey='edad'
                        placeholder='Edad de la mascota'
                        error={!!edadValid && formSubmitted}
                        errorMessage={edadValid}
                        keyboardType='numeric'
                    />

                    <InputText
                        label='Descripcion de la mascota'
                        value={descripcion}
                        onChangeText={onInputTextChange}
                        changeTextKey='descripcion'
                        placeholder='Breve descripcion de la mascota'
                        error={!!descripcionValid && formSubmitted}
                        errorMessage={descripcionValid}
                    />

                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Caracteristicas</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setCaracteristicasModalVisible(true)}
                        >
                            {
                                (caracteristicasMascota.length === 0)
                                    ? <Text>Presione para seleccionar</Text>
                                    : <Text>
                                        {
                                            caracteristicasMascota.map(e => (e + ' '))
                                        }
                                    </Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <Button
                        text='Registrar'
                        onPress={onPressRegisterButton}
                        isLoading={isLoading}
                        stylesProps={{ marginTop: 51, width: windowWidth * 0.85 }} 
                    />
                    <View style={{ height: 100 }} />

                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                modalFor='tipoMascota'
                visible={tipoMascotaModalVisible}
                onCloseModal={onCloseModalTipoMascota}
                onOptionSelected={onSelectOptionTipoMascota}
                modalHeight={230}
                currentOption={tipoMascota}
            />

            <Modal
                modalFor='caracteristicaMascota'
                visible={caracteristicasModalVisible}
                onCloseModal={onCloseModalCaracteristicaMascota}
                onOptionSelected={onSelectOptionCaracteristicaMascota}
                modalHeight={330}
                currentOption={caracteristicasMascota}
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
        fontSize: 16,
        fontWeight: '500',
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
        marginBottom: 15
    },
})
