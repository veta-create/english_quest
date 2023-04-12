import lodash from 'lodash';
import { SettingsState } from '../../types';

const initialState: SettingsState = {
    fieldWidth: 3,
    fieldHeight: 3,
    //timer в миллисекундах
    timer: 15000,
    settingsOpen: false 
};

export interface ChangeFieldSize {
    type: "CHANGE_FIELD_SIZE",
};

export interface ChangeSettingsOpen {
    type: "CHANGE_SETTINGS_OPEN",
    settingsOpen: boolean
};

export interface SetTimer {
    type: "SET_TIMER"
};

type SettingsActions = ChangeFieldSize | ChangeSettingsOpen | SetTimer;

export const settingsReducer = (state = initialState, action: SettingsActions) => {
    const stateCopy = lodash.cloneDeep(state);
    switch (action.type) {
        case "CHANGE_FIELD_SIZE": {
            if (stateCopy.fieldWidth < 6) {
                if (stateCopy.fieldWidth === 4) {
                    stateCopy.fieldWidth = 6;
                } else {
                    stateCopy.fieldWidth += 1;
                };
            } else {
                stateCopy.fieldWidth = 3;
            };

            if (stateCopy.fieldHeight < 5) {
                stateCopy.fieldHeight += 1;
            } else {
                stateCopy.fieldHeight = 3;
            };

            return stateCopy;
        };
        case "CHANGE_SETTINGS_OPEN":
            stateCopy.settingsOpen = action.settingsOpen;
            return stateCopy;
        case "SET_TIMER":
            if(stateCopy.timer === 60000) {
                stateCopy.timer = 15000;
            } else {
                stateCopy.timer += 15000;
            };
            return stateCopy;
        default:
            return state;
    }
};

export const changeFieldSize = () => ({
    type: "CHANGE_FIELD_SIZE" as const
});

export const changeSettingsOpen = (settingsOpen: boolean) => ({
    type: "CHANGE_SETTINGS_OPEN" as const,
    settingsOpen
});

export const setTimer = () => ({
    type: "SET_TIMER"
});