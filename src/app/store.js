import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import viewReducer from '../features/view/viewSlice';
import filterReducer from '../features/filter/filterSlice';
import commonReducer from './commonSlice';

export default configureStore({
    reducer: {
        filter: filterReducer,
        view: viewReducer,
        common: commonReducer,
        isLoading: false,
    }
}, composeWithDevTools());