import { SettingsState } from "../../../types";
import settingsSlice, { changeSettingsOpen, setTimer } from "./settingsSlice";

const state: SettingsState = {
    //timer в секундах
    timer: 15,
    settingsOpen: false
};

describe('settings open must change', () => {
    it('settings open must be true', () => {
        const action = changeSettingsOpen(true);

        const result = settingsSlice(state, action);

        expect(result.settingsOpen).toBe(true);
    });
});

describe('timer must change', () => {
    it('timer must be 30', () => {
        const action = setTimer(30);

        const result = settingsSlice(state, action);

        expect(result.timer).toBe(30);
    });
});