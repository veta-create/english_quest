import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { constructorReducer } from './constructor-page/constructorReducer';
import { settingsReducer } from './settings-page/settingsReducer';
import gameSlice from './game-page/gameSlice';
import constructorSlice from './constructor-page/constructorSlice';

const reducers = combineReducers({
    gamePage: gameSlice,
    constructorPage: constructorSlice,
    settingsPage: settingsReducer
});

const store = configureStore({reducer: reducers});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;