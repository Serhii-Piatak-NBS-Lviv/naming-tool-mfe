import { createSlice } from '@reduxjs/toolkit';

export const viewSlice = createSlice({
    name: 'view',
    initialState: {
        "hero_image": "../../app/apisimul/view/hero-puppy.png",
        "names_list": [],
        "selected_name": {
            "id": "",
            "title": "",
            "taxonomy_terms": {
                "capital_letter": "",
                "categories": [],
                "gender": "",
            },
            "description": "",
        }
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
    },
});

export const { addPetName } = viewSlice.actions;

export default viewSlice.reducer;