import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth';

export const petsSlice = createSlice({
    name: 'pets',
    initialState: {
        isLoading: false,
        pets: [],
        selectedPet: {}
    },
    reducers: {
        startLoadingPets:(state) => {
            state.isLoading = true
        },
        setPets: (state, { payload } ) => {
            state.isLoading = false
            state.pets = payload.data
        },
        setCurrentPet:(state,{payload}) => {
            state.selectedPet = payload
        },
        resetStorePets: (state) => {
            state.isLoading = false
            state.pets = []
            state.selectedPet = {}
        }
        
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingPets, setPets, setCurrentPet, resetStorePets } = petsSlice.actions;