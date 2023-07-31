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
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },

        setLocale: (state, action) => {
            state.locale = action.payload;
        }
    },
});

export const { setTheme, setLocale } = commonSlice.actions;

export default commonSlice.reducer;