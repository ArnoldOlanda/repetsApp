
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './useForm';

import { registerPet } from '../helpers/registerPet';
import { obtenerMascotasUsuario } from '../store/slices/pets/thunks';

const initialState = {
    nombre:'',
    tipoMascota:'',
    raza:'',
    edad:'',
    descripcion:'',
    caracteristicasMascota:[]
}


export const useRegisterPet = () => {

    const navigation = useNavigation()

    const { uid } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const { formState, onInputTextChange, onResetForm } = useForm( initialState );

    const { caracteristicasMascota } = formState

    const [tipoMascotaModalVisible, setTipoMascotaModalVisible] = useState(false);
    const [caracteristicasModalVisible, setCaracteristicasModalVisible] = useState(false);

    const onCloseModalTipoMascota = () => {
        setTipoMascotaModalVisible(false);
    }

    const onCloseModalCaracteristicaMascota = () => {
        setCaracteristicasModalVisible(false);
    }

    const onSelectOptionTipoMascota = (option) => {
        onInputTextChange('tipoMascota', option )
    }

    const onSelectOptionCaracteristicaMascota = (option) => {
        const mascota = caracteristicasMascota.find( e => e === option ); //Buscar si el elemento ya esta en el array
        if(!mascota) onInputTextChange('caracteristicasMascota',[...caracteristicasMascota, option]);
        else {
            onInputTextChange('caracteristicasMascota', caracteristicasMascota.filter( e => e !== option ) )
        }
    }

    const onPressRegisterButton = async () => {
        await registerPet( formState, uid );
        onResetForm();
        navigation.navigate('MyPets');
        dispatch( obtenerMascotasUsuario() )
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
    onPressRegisterButton
  }
}
