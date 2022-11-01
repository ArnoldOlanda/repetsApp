import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/auth';
import { messagesSlice } from './slices/messages/messagesSlice';
import { pethousesSlice } from './slices/pethouses/pethousesSlice';
import { petsSlice } from './slices/pets';

export const store = configureStore ({
  reducer : {
    auth: authSlice.reducer,
    pets: petsSlice.reducer,
    messages: messagesSlice.reducer,
    pethouses: pethousesSlice.reducer
  },
})