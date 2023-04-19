import { combineReducers, configureStore } from '@reduxjs/toolkit'
import gameSlice from './game-page/gameSlice';
import constructorSlice from './constructor-page/constructorSlice';
import settingsSlice from './settings-page/settingsSlice';

const reducers = combineReducers({
    gamePage: gameSlice,
    constructorPage: constructorSlice,
    settingsPage: settingsSlice
});

const store = configureStore({reducer: reducers});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;