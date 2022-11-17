import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: 'light', //dark
        dark: false,
        // colors: {
        //     primary: '#ffffff',
        //     background: '#111111',
        //     card: '#222222',
        //     text: '#eeeeee',
        //     text2: '#cccccc',
        //     border: 'green',
        //     notification: 'orange'
        // },
        colors: {
            primary: '#000000',
            background: '#ffffff',
            card: '#ffffff',
            card2:'#ffffff',
            text: '#000000',
            text2: '#111111',
            border: 'green',
            blue:'#2782CA',
            gray:'#6B6A6F',
            notification: 'orange',
        },
    },
    reducers: {
        setDarkTheme: (state) => {
            state.currentTheme= 'dark', //dark
            state.dark= true,
            state.colors= {
                primary: '#ffffff',
                background: '#111111',
                card: '#111111',
                card2:'#222222',
                text: '#eeeeee',
                text2: '#cccccc',
                border: 'green',
                blue:'#2782CA',
                gray:'#6B6A6F',
                notification: 'orange'
            }
        },
        setLightTheme: (state) => {
            state.currentTheme= 'light', //dark
            state.dark= false,
            state.colors= {
                primary: '#000000',
                background: '#ffffff',
                card: '#ffffff',
                card2:'#ffffff',
                text: '#000000',
                text2: '#111111',
                border: 'green',
                blue:'#2782CA',
                gray:'#6B6A6F',
                notification: 'orange',
            }
        }
    }
});


// Action creators are generated for each case reducer function
export const { setDarkTheme, setLightTheme } = themeSlice.actions;