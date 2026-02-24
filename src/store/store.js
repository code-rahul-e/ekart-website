import {configureStore} from '@reduxjs/toolkit'

import cartSliceReducer from './cartSlice'
import searchReducer from './searchSlice'
import viewReducer from './viewSlice'

export const store = configureStore({
    reducer : {
        cart : cartSliceReducer,
        search: searchReducer,
        view: viewReducer,
    }
})