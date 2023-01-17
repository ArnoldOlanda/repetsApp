import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { startRegisterNewPethouse } from '../store/slices/pethouses/thunks';
import { useForm } from './useForm';
import { ToastAndroid } from 'react-native';

const initialState = {
    nombre: '',
    descripcion:'',
    provincia: '',
    distrito: '',
    tipoMascota: '',
    tamanioMascotas: [],
    tipoAlojamiento: [],
    tarifaHora: 'S/. ',
    tarifaDia: 'S/. '
}

const formValidations = {
    nombre:      [value => value.length >= 1, 'Este campo es obligatorio'],
    descripcion: [value => value.length >= 1, 'Este campo es obligatorio'],
    provincia:   [value => value.length >= 1, 'Este campo es obligatorio'],
    distrito:    [value => value.length >= 1, 'Este campo es obligatorio'],
    tipoMascota: [value => value.length >= 1, 'Este campo es obligatorio'],
    tarifaHora:  [value => value.length > 4, 'Debe establecer la tarifa por hora'],
    tarifaDia:   [value => value.length > 4, 'Debe establecer la tarifa por dia'],
}

export const useRegisterPethouse = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { formState, formValidation, onInputTextChange, isFormValid } = useForm(initialState, formValidations);

    const [tipoMascotaModalVisible, setTipoMascotaModalVisible] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);
    const [formSubmited, setFormSubmited] = useState(false);

    const { nombre, descripcion, provincia, 
        distrito, tipoMascota, tamanioMascotas, 
        tipoAlojamiento, tarifaHora, tarifaDia } = formState;

    const onCloseModalTipoMascota = () => { 
        setTipoMascotaModalVisible(false) 
    }

    const onSelectOptionTipoMascota = (option) => { 
        onInputTextChange('tipoMascota', option) 
    }

    const onSetNewImageToArray = (image) => { 
        setGalleryImages(prev => [...prev, image]) 
    }

    const onRemoveImageFromArray = (image) => { 
        setGalleryImages(prev => prev.filter(e => e.name !== image.name)) 
    }

    const onPressRegisterPetHouse = () => {

        setFormSubmited(true)

        if (!isFormValid) {
            return ToastAndroid.show('Revise los datos ingresados', ToastAndroid.SHORT)
        };

        const data = {
            nombre,
            descripcion,
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

    return {
        formState,
        formValidation,
        galleryImages,
        tipoMascotaModalVisible,
        setTipoMascotaModalVisible,
        formSubmited,

        onInputTextChange,
        onCloseModalTipoMascota,
        onSelectOptionTipoMascota,
        onSetNewImageToArray,
        onRemoveImageFromArray,
        onPressRegisterPetHouse
    }
}
