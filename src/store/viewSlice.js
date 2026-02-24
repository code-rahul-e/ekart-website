import {createSlice} from '@reduxjs/toolkit'

const viewSlice = createSlice({
    name:"view",
    initialState:[],
    reducers:{
        addViewItem(state,action){
            console.log(action)
            state.length=0;
            state.push(action.payload)
        }
    }
})

export default viewSlice.reducer

export let {addViewItem} = viewSlice.actions 