import { SettingsState } from "../../types";
import { settingsReducer, ChangeFieldSize, changeFieldSize } from "./settingsReducer";

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