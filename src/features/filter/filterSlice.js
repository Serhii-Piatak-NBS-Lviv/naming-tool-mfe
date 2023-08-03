import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        selectedCategories: "",
        gender: "",
        letter: "",
        specificName: "",
    },
    
    reducers: {
        setSelectedCategory: (state, action) => {
            if(state.selectedCategories !== action.payload) {
                return {...state, selectedCategories: action.payload}
            } else {
                return {...state, selectedCategories: ''}
            }            
        },

        setGender: (state, action) => {
            return {
                ...state,
                gender: action.payload,
            };
        },   
        
        setLetter: (state, action) => {
            if(state.letter !== action.payload) {
                return {...state, letter: action.payload}
            } else {
                return {...state, letter: ''}
            }
        }
    },    
});

export const { setSelectedCategory, setGender, setLetter } = filterSlice.actions;

export default filterSlice.reducer;