import { SettingsState } from "../../../types";
import { settingsReducer, ChangeFieldSize, changeFieldSize, changeSettingsOpen, ChangeSettingsOpen, setTimer, SetTimer } from "./settingsReducer";

const state: SettingsState = {
    fieldWidth: 3,
    fieldHeight: 3,
    //timer в миллисекундах
    timer: 15000,
    settingsOpen: false
};

describe('field width and field height must change', () => {
    it('field width must be 4, field height must be 4', () => {
        const action: ChangeFieldSize = changeFieldSize();

        const result = settingsReducer(state, action);

        expect(result.fieldWidth).toBe(4);
        expect(result.fieldHeight).toBe(4);
    });
});

describe('settings open must change', () => {
    it('settings open must be true', () => {
        const action: ChangeSettingsOpen = changeSettingsOpen(true);

        const result = settingsReducer(state, action);

        expect(result.settingsOpen).toBe(true);
    });
});

describe('timer must change', () => {
    it('timer must be 30000', () => {
        const action: SetTimer = setTimer();

        const result = settingsReducer(state, action);

        expect(result.timer).toBe(30000);
    });
});