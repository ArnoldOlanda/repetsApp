import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { useForm } from '../hooks'

import { Button } from '../components/Button'
import { InputText } from '../components/InputText'
import { Modal } from '../components/RegisterPetScreen/Modal'
import { Title } from '../components/Title'
import { GalleryImages } from '../components/RegisterPethouseScreen/GalleryImages'

import { useDispatch, useSelector } from 'react-redux'
import { startRegisterNewPethouse } from '../store/slices/pethouses/thunks'





const windowWidth = Dimensions.get('window').width

const initialState = {
    nombre: '',
    provincia: '',
    distrito: '',
    tipoMascota: '',
    tamanioMascotas: 'Pequeños',
    tipoAlojamiento: 'Horas',
    tarifaHora: 'S/. ',
    tarifaDia: 'S/. '
}

const formValidations = {
    nombre: [value => value.length >= 1, 'Este campo es obligatorio'],
    provincia: [value => value.length >= 1, 'Este campo es obligatorio'],
    distrito: [value => value.length >= 1, 'Este campo es obligatorio'],
    tipoMascota: [value => value.length >= 1, 'Este campo es obligatorio'],
    tarifaHora: [value => value.length >= 1, 'Debe establecer una tarifa por hora'],
    tarifaDia: [value => value.length >= 1, 'Debe establecer una tarifa por dia'],
}

const tamanioMascotasOptions = ['Pequeños', 'Medianos', 'Grandes'];
const tipoAlojamientoOptions = ['Horas', 'Dias', 'Semanas'];

export const RegisterPetHouseScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.pethouses)

    const { formState, formValidation, onInputTextChange, onResetForm, isFormValid } = useForm(initialState, formValidations)

    const { nombre, provincia, distrito, tipoMascota, tamanioMascotas, tipoAlojamiento, tarifaHora, tarifaDia } = formState
    const { nombreValid, provinciaValid, distritoValid, tipoMascotaValid, tarifaHoraValid, tarifaDiaValid } = formValidation

    const [tipoMascotaModalVisible, setTipoMascotaModalVisible] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    const [formSubmited, setFormSubmited] = useState(false)

    const onCloseModalTipoMascota = () => { setTipoMascotaModalVisible(false) }
    const onSelectOptionTipoMascota = (option) => { onInputTextChange('tipoMascota', option) }
    const onSetNewImageToArray = (image) => { setGalleryImages(prev => [...prev, image]) }

    const onRemoveImageFromArray = (image) => { setGalleryImages(prev => prev.filter(e => e.name !== image.name)) }

    const onPressRegisterPetHouse = () => {

        setFormSubmited(true)

        if (!isFormValid) {
            return ToastAndroid.show('Revise los datos ingresados', ToastAndroid.SHORT)
        };

        const data = {
            nombre,
            provincia,
            distrito,
            tipoMascota,
            tamanioMascotas,
            tipoAlojamiento,
            galleryImages,
            tarifaHora,
            tarifaDia
        }

        dispatch(startRegisterNewPethouse(data))
        ToastAndroid.show('Pethuse registrada', ToastAndroid.SHORT)
        navigation.navigate('MainProfile')
    }



    return (
        <View style={styles.container}>
            <View style={{ width: windowWidth, paddingHorizontal: 27 }}><Title text='Registra tu Hospedaje' icon='🏠' /></View>
            <Text style={{ width: windowWidth, paddingHorizontal: 27 }}>Ingresa la informacion para tu hospedaje</Text>

            <ScrollView style={styles.formContainer}>
                <InputText
                    label='Nombre de tu hospedaje'
                    placeholder='Nombre del hospedaje'
                    onChangeText={onInputTextChange}
                    changeTextKey='nombre'
                    value={nombre}
                    error={!!nombreValid && formSubmited}
                    errorMessage={nombreValid}
                />

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Seleccione una provincia</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={{
                            inputAndroid: !!tipoMascotaValid && formSubmited ? { ...styles.input, borderWidth: 1, borderColor: 'red', color: 'gray' } : { ...styles.input, color: 'gray' },
                            placeholder: { color: 'gray' }
                        }}
                        value={provincia}
                        onValueChange={(value) => onInputTextChange('provincia', value)}
                        items={[
                            { label: 'Arequipa', value: 'arequipa' },
                            // { label: 'Camana', value: 'camana' },
                            // { label: 'Caravelí', value: 'caravelí' },
                            // { label: 'Caylloma', value: 'caylloma' },
                            // { label: 'Condesuyos', value: 'condesuyos' },
                            // { label: 'Islay', value: 'islay' },
                            // { label: 'La union', value: 'la union' },
                        ]}
                        placeholder={{
                            label: 'Selecciona una opcion',
                            value: '',
                            color: 'lightgray'
                        }}
                    />
                    {
                        (!!provinciaValid && formSubmited) && <Text style={styles.textError} >{provinciaValid}</Text>
                    }
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Seleccione un distrito</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        value={distrito}
                        style={{
                            inputAndroid: !!tipoMascotaValid && formSubmited ? { ...styles.input, borderWidth: 1, borderColor: 'red', color: 'gray' } : { ...styles.input, color: 'gray' },
                            placeholder: { color: 'gray' }
                        }}
                        onValueChange={(value) => onInputTextChange('distrito', value)}
                        items={[
                            { label: 'Cercado', value: 'cercado' },
                            { label: 'Paucarpata', value: 'paucarpata' },
                            { label: 'Miraflores', value: 'miraflores' },
                            { label: 'Hunter', value: 'hunter' },
                            { label: 'Tiabaya', value: 'tiabaya' },
                            { label: 'Yura', value: 'yura' },
                            { label: 'Selva alegre', value: 'selva alegre' },
                        ]}
                        placeholder={{
                            label: 'Selecciona una opcion',
                            value: '',
                            color: 'lightgray'
                        }}
                    />
                    {
                        (!!distritoValid && formSubmited)
                        && (<Text style={styles.textError} >{distritoValid}</Text>)
                    }
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Tipo de mascota que aceptas</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={!!tipoMascotaValid && formSubmited ? { ...styles.input, borderWidth: 1, borderColor: 'red' } : styles.input}
                        onPress={() => setTipoMascotaModalVisible(true)}
                    >
                        {
                            (tipoMascota.length === 0)
                                ? <Text>Presione para elegir un tipo de mascota</Text>
                                : <Text>{tipoMascota}</Text>
                        }
                    </TouchableOpacity>
                    {
                        (!!tipoMascotaValid && formSubmited) && <Text style={styles.textError} >{tipoMascotaValid}</Text>
                    }
                </View>

                <View style={styles.inputContainer} >
                    <Text style={styles.labelText} >Tamaño de mascotas permitidos</Text>
                    <View style={styles.buttonOptionsContainer}>
                        {
                            tamanioMascotasOptions.map(e => (
                                <TouchableOpacity
                                    activeOpacity={0.6}
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
                    <Text style={styles.labelText} >Tipo de alojamiento que aceptas</Text>
                    <View style={styles.buttonOptionsContainer}>
                        {
                            tipoAlojamientoOptions.map(e => (
                                <TouchableOpacity
                                    activeOpacity={0.6}
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
                    <Text style={styles.labelText}>Seleccione las fotos de su hospedaje <Text style={{ fontSize: 12 }} >(Maximo 3)</Text></Text>
                    <GalleryImages
                        onChange={onSetNewImageToArray}
                        onDelete={onRemoveImageFromArray}
                        galleryImages={galleryImages}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <InputText
                        label='Establezca una tarifa por horas'
                        placeholder='Tarifa por hora'
                        onChangeText={onInputTextChange}
                        changeTextKey='tarifaHora'
                        value={tarifaHora}
                        error={!!tarifaHoraValid && formSubmited}
                        errorMessage={tarifaHoraValid}
                        keyboardType='numeric'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <InputText
                        label='Establezca una tarifa por dia'
                        placeholder='Tarifa por dia'
                        onChangeText={onInputTextChange}
                        changeTextKey='tarifaDia'
                        value={tarifaDia}
                        error={!!tarifaDiaValid && formSubmited}
                        errorMessage={tarifaDiaValid}
                        keyboardType='numeric'
                    />
                </View>


                <Button
                    text='Registrar'
                    onPress={onPressRegisterPetHouse}
                    stylesProps={{ marginTop: 51, width: windowWidth * 0.85 }}
                    isLoading={isLoading}
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
        paddingBottom: 0,
        paddingVertical: 5
    },
    inputContainer: {
        marginBottom: 8,
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
        marginTop: 10
    },
    buttonOptionsContainer: {
        marginTop: 5,
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
    textError: {
        fontSize: 10,
        color: 'red'
    }
})
