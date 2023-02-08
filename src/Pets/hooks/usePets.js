//@ts-check
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPets, startLoadingPets } from '../../store/slices/pets';
import { getPets } from '../services/getPetsService';

export const usePets = () => {
    //@ts-ignore
    const { image, uid } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();

    const fetchPets = async() => {
        try {
            dispatch(startLoadingPets());
            const pets = await getPets(uid);
            dispatch(setPets(pets));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPets();
    }, [])

  return {
    image
  }
}
