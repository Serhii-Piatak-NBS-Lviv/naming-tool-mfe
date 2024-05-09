import { createSlice } from '@reduxjs/toolkit';

// https://uat-dig0031655-petcare-purinattt-italy.pantheonsite.io/namingtool-petname-categories?_format=json
// http://tttspoof.ddev.site/petnames-categories?_format=json
export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        "locale": "en",
        "theme": "default",
        "categoriesOrigin": 'https://nestle-purina-vetsportal.ddev.site/v1/nt_api/categories_resource',
        "namesOrigin": 'https://purina.co.uk/v1/nt_api/petnames_resource',
        "showLoader": true,
        "fetchedNamesList": [],
        "fetchedCategoriesList": [],
        "showLoadMore": true
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
        },

        initializeCategoriesList: (state, action) => {
            state.fetchedCategoriesList = [...action.payload];
        },

        toggleLoadMoreBtn: (state) => {
            state.showLoadMore = !state.showLoadMore;
        },
    },
});

export const { setTheme, setLocale, toggleLoader, initializeNamesList, initializeCategoriesList, toggleLoadMoreBtn } = commonSlice.actions;

export default commonSlice.reducer;