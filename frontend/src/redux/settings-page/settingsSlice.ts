import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from '../../../types';

const initialState: SettingsState = {
    fieldWidth: 3,
    fieldHeight: 3,
    //timer в миллисекундах
    timer: 15000,
    settingsOpen: false
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        changeFieldSize(state) {
            if (state.fieldWidth < 6) {
                if (state.fieldWidth === 4) {
                    state.fieldWidth = 6;
                } else {
                    state.fieldWidth += 1;
                };
            } else {
                state.fieldWidth = 3;
            };

            if (state.fieldHeight < 5) {
                state.fieldHeight += 1;
            } else {
                state.fieldHeight = 3;
            };
        },
        changeSettingsOpen(state, action) {
            state.settingsOpen = action.payload;
        },
        setTimer(state) {
            if (state.timer === 60000) {
                state.timer = 15000;
            } else {
                state.timer += 15000;
            };
        },
    }
});

export default settingsSlice.reducer;
export const { changeFieldSize, changeSettingsOpen, setTimer } = settingsSlice.actions;