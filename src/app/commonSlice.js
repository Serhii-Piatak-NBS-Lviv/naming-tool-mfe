import { createSlice } from '@reduxjs/toolkit';

const currentUrl = 'https://www.purina.co.uk';
// const currentUrl = window.location.origin;

let langprefix = "";

if (window.drupalSettings) langprefix = window?.drupalSettings?.path?.pathPrefix || "";

const categoriesUrl = `${langprefix}v1/nt_api/categories_resource`;
const petNamesUrl = `${langprefix}v1/nt_api/petnames_resource`;

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        "locale": "en",
        "theme": "default",
        "categoriesOrigin": `${currentUrl}/${categoriesUrl}`,
        "namesOrigin": `${currentUrl}/${petNamesUrl}`,
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