import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/auth';
import { petsSlice } from './slices/pets';

export const store = configureStore ({
  reducer : {
    auth: authSlice.reducer,
    pets: petsSlice.reducer
  },
})