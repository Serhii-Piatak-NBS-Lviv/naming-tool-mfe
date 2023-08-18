import { createSlice } from '@reduxjs/toolkit';

// https://uat-dig0031655-petcare-purinattt-italy.pantheonsite.io/namingtool-petname-categories?_format=json
// http://tttspoof.ddev.site/petnames-categories?_format=json
export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        "locale": "en",
        "theme": "default",
        "categoriesOrigin": 'https://uat-dig0031655-petcare-purinattt-italy.pantheonsite.io/namingtool-petname-categories?_format=json',
        "namesOrigin": 'https://uat-dig0031655-petcare-purinattt-italy.pantheonsite.io/namingtool-petnames-all?_format=json',
        "showLoader": false,
        "fetchedNamesList": []
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },

        setLocale: (state, action) => {
            state.locale = action.payload;
        },

        toggleLoader: (state) => {
            state.showLoader = !state.showLoader;
        },

        initializeNamesList: (state, action) => {
            state.fetchedNamesList = [...action.payload];
        }
    },
});

export const { setTheme, setLocale, toggleLoader, initializeNamesList } = commonSlice.actions;

export default commonSlice.reducer;