import { createSlice } from '@reduxjs/toolkit';

export const petsSlice = createSlice({
    name: 'pets',
    initialState: {
        isLoading: false,
        pets: [],
    },
    reducers: {
        loadingPets:(state) => {
            state.isLoading = true
        },
        setPets: (state, { payload } ) => {
            state.isLoading = false
            state.pets = payload
        },
        
    }
});


// Action creators are generated for each case reducer function
export const { loadingPets, setPets } = petsSlice.actions;