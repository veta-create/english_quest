import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { constructorReducer } from './constructorReducer';
import { gameReducer } from './gameReducer'
import { settingsReducer } from './settingsReducer';

const reducers = combineReducers({
    gamePage: gameReducer,
    constructorPage: constructorReducer,
    settingsPage: settingsReducer
});

const store = configureStore({reducer: reducers});

window.store = store;

export default store;