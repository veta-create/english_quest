import { RootState } from "./store";

export const getFieldWidth = (state: RootState) => {
    return state.settingsPage.fieldWidth;
};

export const getFieldHeight = (state: RootState) => {
    return state.settingsPage.fieldHeight;
};

export const getPlayersCount = (state: RootState) => {
    return state.settingsPage.playersCount;
}