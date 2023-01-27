import { createSlice } from '@reduxjs/toolkit';

export const notificactionSlice = createSlice({
    name: 'notificaction',
    initialState: {
        notifications: [], //{ tipo:string, data:{} }
        notificationsCounter: 0,
        incomingNotification: false
    },
    reducers: {
        setNewNotification: (state, {payload} ) => {
            state.notifications.push(payload);
        },
        setIncomingNotificationStatus: (state,{payload})=>{
            state.incomingNotification = payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { setNewNotification, setIncomingNotificationStatus } = notificactionSlice.actions;