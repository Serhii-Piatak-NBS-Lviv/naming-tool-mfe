import { createSlice } from '@reduxjs/toolkit';

export const viewSlice = createSlice({
    name: 'view',
    initialState: {
        "hero_image": "../../app/apisimul/view/hero-puppy.png",
        "names_list_prevsize": 0,
        "names_list_size": 0,
        "names_list": [],
        "petnames_portion": 32,
        "names_list_full": [],
        "selected_name": '',
    },
    reducers: {
        addPetName: (state, action) => {
            const {tid, name, field_nbs_nmngtool_description, field_nbs_nmngtool_name_category, field_nbs_nmngtool_gender} = action.payload;
            const ctg = field_nbs_nmngtool_name_category.reduce((acc, item) => {
                acc.push(item.target_id);
                return acc;
            }, []);
            state.names_list.push({
                "id": tid[0].value,
                "title": name[0].value,
                "description": field_nbs_nmngtool_description[0].value,
                "categories": ctg,
                "gender": field_nbs_nmngtool_gender[0].value,
            });
        },

        setNamesList: (state, action) => {
            state.names_list_prevsize = state.names_list.length;
            state.names_list = [...action.payload];
            state.names_list_size = state.names_list.length;
        },

        selectPetName: (state, action) => {
            state.selected_name = action.payload;
        },

        setPetnamesPortion: (state, action) => {
            state.petnames_portion = action.payload;
        },

        loadAllPetnames: (state, action) => {
            state.names_list_full = [...action.payload];
        },

    },
});

export const { addPetName, setNamesList, selectPetName, setPetnamesPortion, loadAllPetnames } = viewSlice.actions;

export default viewSlice.reducer;