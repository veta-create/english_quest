import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from '../../../types';

const initialState: SettingsState = {
    //timer в секундах
    timer: 15,
    settingsOpen: false
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        changeSettingsOpen(state, action) {
            state.settingsOpen = action.payload;
        },
        setTimer(state, action) {
            state.timer = action.payload;
        },
    }
});

export default settingsSlice.reducer;
export const { changeSettingsOpen, setTimer } = settingsSlice.actions;