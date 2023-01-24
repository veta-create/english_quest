const CHANGE_FIELD_SIZE = "CHANGE_FIELD_SIZE";
const CHANGE_PLAYERS_COUNT = "CHANGE_PLAYERS_COUNT";

const initialState = {
    fieldWidth: 3,
    fieldHeight: 3,
    playersCount: 2
};

export const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_FIELD_SIZE:
            let newFieldWidth = state.fieldWidth;
            let newFieldHeight = state.fieldHeight;
            if(newFieldWidth < 6) {
                newFieldWidth++;
            };

            if(newFieldHeight < 5) {
                newFieldHeight++;
            };
            return {...state, fieldWidth: newFieldWidth, fieldHeight: newFieldHeight};
        case CHANGE_PLAYERS_COUNT:
            let newPlayersCount = state.playersCount;
            if(newPlayersCount < 5) {
                newPlayersCount++;
            }
            return {...state, playersCount: newPlayersCount}
        default:
            return state;
    }
};

export const changeFieldSize = () => ({
    type: CHANGE_FIELD_SIZE,
});

export const changePlayersCount = () => ({
    type: CHANGE_PLAYERS_COUNT
});