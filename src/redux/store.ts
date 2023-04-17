import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { constructorReducer } from './constructor-page/constructorReducer';
import { gameReducer } from './game-page/gameReducer'
import { settingsReducer } from './settings-page/settingsReducer';

const reducers = combineReducers({
    gamePage: gameReducer,
    constructorPage: constructorReducer,
    settingsPage: settingsReducer
});

const store = configureStore({reducer: reducers});

export type RootState = ReturnType<typeof store.getState>;

export default store;