//@ts-check
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPet, startLoadingPets } from '../../store/slices/pets';
import { updatePetImageService } from '../services/updatePetImageService';

export const useDetailPet = () => {
    //@ts-ignore
    const { selectedPet, isLoading } = useSelector(state => state.pets);
    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = (visible) => setIsModalVisible(visible);

    const onPressUpdatePetImage = (image) => {
        //@ts-ignore
        updateImage(image);
        // dispatch(startUpdatePetImage(image))
    }

    const updateImage = async(image)=>{
        try {
            dispatch(startLoadingPets());

            const currentPet = await updatePetImageService(image,selectedPet.uid);

            dispatch(setCurrentPet(currentPet));

        } catch (error) {
            console.log(error);
        }
    }

    return {
        selectedPet,
        isLoading,
        isModalVisible,
        setIsModalVisible,
        toggleModal,
        onPressUpdatePetImage
    }
}
