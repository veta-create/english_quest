import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { constructorReducer } from './constructorReducer';
import { gameReducer } from './gameReducer'

const reducers = combineReducers({
    gamePage: gameReducer,
    constructorPage: constructorReducer
});

const store = configureStore({reducer: reducers});

window.store = store;

export default store;