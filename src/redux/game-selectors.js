export const getField = (state) => {
    return state.gamePage.field;
};

export const getThemes = (state) => {
    return state.gamePage.themes;
};

export const getPlayers = (state) => {
    return state.gamePage.players;
};

export const getCurrentPlayer = (state) => {
    return state.gamePage.currentPlayer;
};

export const getCurrentQuestion = (state) => {
    return state.gamePage.currentQuestion;
};

export const getCurrentAnswer = (state) => {
    return state.gamePage.currentQuestion.currentAnswer;
};

