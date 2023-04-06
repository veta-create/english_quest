import lodash from 'lodash';
const CHANGE_PLAYERS_COUNT = "CHANGE_PLAYERS_COUNT";

const initialState = {
    fieldWidth: 3,
    fieldHeight: 3,
    playersCount: 2
};

export interface ChangeFieldSize {
    type: "CHANGE_FIELD_SIZE",
};

export interface ChangePlayersCount {
    type: "CHANGE_PLAYERS_COUNT",
};

type SettingsActions = ChangeFieldSize | ChangePlayersCount;

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
        case CHANGE_PLAYERS_COUNT: {
            if (stateCopy.playersCount < 5) {
                stateCopy.playersCount += 1;
            } else {
                stateCopy.playersCount = 1;
            };
            return stateCopy;
        };
        default:
            return state;
    }
};

export const changeFieldSize = () => ({
    type: "CHANGE_FIELD_SIZE" as const
});

export const changePlayersCount = () => ({
    type: "CHANGE_PLAYERS_COUNT" as const
});