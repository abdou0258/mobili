import {createSlice, current} from '@reduxjs/toolkit'

const initialState ={
    currentUser:null,
    error:null,
    loading:false,
    favorite:[]
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart : (state)=>{
            state.loading = true
            state.error = null
        },
        signInSuccess: (state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action)=>{
            state.error = action.payload
            state.loading = false
        },
        updateUserStart : (state)=>{
            state.loading = true
            state.error = null
        },
        updateUserSuccess: (state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        updateUserFailure: (state, action)=>{
            state.error = action.payload
            state.loading = false
        },
        deleteUserStart : (state)=>{
            state.loading = true
            state.error = null
        },
        deleteUserSuccess: (state,action)=>{
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        deleteUserFailure: (state, action)=>{
            state.error = action.payload
            state.loading = false
        },
        signoutUserStart : (state)=>{
            state.loading = true
            state.error = null
        },
        signoutUserSuccess: (state,action)=>{
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        signoutUserFailure: (state, action)=>{
            state.error = action.payload
            state.loading = false
        },
        
    }
    
})

export const {signInStart ,signInSuccess,signInFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure
    ,signoutUserStart,signoutUserSuccess,signoutUserFailure
} = userSlice.actions

export default userSlice.reducer