import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        categoryList: [],
        selectedCategories: [],
        gender: "",
        specificName: "",
    },
    
    reducers: {
        setSelectedCategory: (state, action) => {
            const index = state.selectedCategories.indexOf(action.payload);
            if (index === -1) {
                return {
                    ...state,
                    selectedCategories: [...state.selectedCategories, action.payload],
                };
            } else {
                return {
                    ...state,
                    selectedCategories: [
                        ...state.selectedCategories.slice(0, index),
                        ...state.selectedCategories.slice(index + 1),
                    ],
                };
            }            
        },
        setGender: (state, action) => {
            return {
                ...state,
                gender: action.payload,
            };
        },        
        setSpecificName: (state, action) => {
            return {
                ...state,
                specificName: action.payload,
            };
        },
        addCategory: (state, action) => {
            const {tid, name, field_nbs_nmngtool_ctg_icodesk, field_nbs_nmngtool_ctg_icomob} = action.payload;
            state.categoryList.push({
                "id": tid[0].value,
                "title": name[0].value,
                "icon_desktop_tablet": {
                    "url": field_nbs_nmngtool_ctg_icodesk.length ? field_nbs_nmngtool_ctg_icodesk[0].url : "",
                    "alt_text": field_nbs_nmngtool_ctg_icodesk.length ? field_nbs_nmngtool_ctg_icodesk[0].alt : ""
                },
                "icon_mobile": {
                    "url": field_nbs_nmngtool_ctg_icomob.length ? field_nbs_nmngtool_ctg_icomob[0].url : "",
                    "alt_text": field_nbs_nmngtool_ctg_icomob.length ? field_nbs_nmngtool_ctg_icomob[0].alt : ""
                }
            });
        }
    },    
});

export const { setSelectedCategory, setSpecificName, setGender, addCategory } = filterSlice.actions;

export default filterSlice.reducer;