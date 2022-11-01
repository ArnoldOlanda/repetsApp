import { createSlice } from '@reduxjs/toolkit';

export const pethousesSlice = createSlice({
    name: 'pethouses',
    initialState: {
        pethouses:[],
        isLoading: false,
        selectedPethouse: null

    },
    reducers: {
        loadingPethouses: (state) => {
            state.isLoading = true;
        },
        setPetHouses: (state,{payload}) => {
            state.isLoading = false;
            state.pethouses = payload
        },
        setCurrentPethouse:(state,{payload}) => {
            state.selectedPethouse = payload
        },
        setNewPethouse:(state,{payload}) => {
            state.isLoading = false;
            state.pethouses = [...state.pethouses, payload]
        },
        resetStorePethouses: ( state ) => {
            state.isLoading = false;
            state.pethouses = [];
            state.selectedPethouse = [];
        } 
    }
});


// Action creators are generated for each case reducer function
export const { loadingPethouses, setCurrentPethouse, setPetHouses, resetStorePethouses,setNewPethouse } = pethousesSlice.actions;