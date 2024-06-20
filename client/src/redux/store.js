import {combineReducers, configureStore} from '@reduxjs/toolkit'
import  userReducer  from './user/userSlice'
import  favoritesReducer  from './user/favoriteSlice'

import {persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({user:userReducer,favorites: favoritesReducer})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig , rootReducer)


export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMidlleware)=>
        getDefaultMidlleware({
            serializableCheck:false,
        })

})

export const persistor = persistStore(store)