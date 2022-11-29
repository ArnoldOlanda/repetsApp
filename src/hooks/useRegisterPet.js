
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './useForm';

import { registerPet } from '../helpers/registerPet';
import { obtenerMascotasUsuario } from '../store/slices/pets/thunks';

const initialState = {
    nombre: '',
    tipoMascota: '',
    raza: '',
    edad: '',
    descripcion: '',
    caracteristicasMascota: []
}

const formValidations = {
    nombre: [value => value.length >= 1, 'Este campo es obligatorio'],
    raza: [value => value.length >= 1, 'Este campo es obligatorio'],
    edad: [value => value.length >= 1, 'Este campo es obligatorio'],
    descripcion: [value => value.length >= 1, 'Este campo es obligatorio'],
}

export const useRegisterPet = () => {

    const navigation = useNavigation()

    const { uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { formState, onInputTextChange, onResetForm, formValidation, isFormValid } = useForm(initialState, formValidations);

    const { caracteristicasMascota } = formState

    const [tipoMascotaModalVisible, setTipoMascotaModalVisible] = useState(false);
    const [caracteristicasModalVisible, setCaracteristicasModalVisible] = useState(false);

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onCloseModalTipoMascota = () => {
        setTipoMascotaModalVisible(false);
    }

    const onCloseModalCaracteristicaMascota = () => {
        setCaracteristicasModalVisible(false);
    }

    const onSelectOptionTipoMascota = (option) => {
        onInputTextChange('tipoMascota', option)
    }

    const onSelectOptionCaracteristicaMascota = (option) => {
        const mascota = caracteristicasMascota.find(e => e === option); //Buscar si el elemento ya esta en el array
        if (!mascota) onInputTextChange('caracteristicasMascota', [...caracteristicasMascota, option]);
        else {
            onInputTextChange('caracteristicasMascota', caracteristicasMascota.filter(e => e !== option))
        }
    }




    const onPressRegisterButton = async () => {

        try {
            setFormSubmitted(true)

            if (!isFormValid) {
                return ToastAndroid.show('Revise los datos ingresados', ToastAndroid.SHORT)
            };

            setIsLoading(true);
            await registerPet(formState, uid);
            setIsLoading(false);

            onResetForm();
            navigation.navigate('MyPets');
            dispatch(obtenerMascotasUsuario());

        } catch (error) {
            console.log(error);
        }
    }

    return {
        formState,
        onInputTextChange,
        tipoMascotaModalVisible,
        setTipoMascotaModalVisible,
        setCaracteristicasModalVisible,
        caracteristicasModalVisible,
        onCloseModalTipoMascota,
        onCloseModalCaracteristicaMascota,
        onSelectOptionTipoMascota,
        onSelectOptionCaracteristicaMascota,
        onPressRegisterButton,
        formValidation,
        isFormValid,
        formSubmitted,
        isLoading,
    }
}
