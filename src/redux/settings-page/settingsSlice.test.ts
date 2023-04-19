import { SettingsState } from "../../../types";
import settingsSlice, { changeFieldSize, changeSettingsOpen, setTimer } from "./settingsSlice";

const state: SettingsState = {
    fieldWidth: 3,
    fieldHeight: 3,
    //timer в миллисекундах
    timer: 15000,
    settingsOpen: false
};

describe('field width and field height must change', () => {
    it('field width must be 4, field height must be 4', () => {
        const action = changeFieldSize();

        const result = settingsSlice(state, action);

        expect(result.fieldWidth).toBe(4);
        expect(result.fieldHeight).toBe(4);
    });
});

describe('settings open must change', () => {
    it('settings open must be true', () => {
        const action = changeSettingsOpen(true);

        const result = settingsSlice(state, action);

        expect(result.settingsOpen).toBe(true);
    });
});

describe('timer must change', () => {
    it('timer must be 30000', () => {
        const action = setTimer();

        const result = settingsSlice(state, action);

        expect(result.timer).toBe(30000);
    });
});