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

export const getQuestionAnswered = (state) => {
    return state.gamePage.questionAnswered;
};

export const getGameOver = (state) => {
    return state.gamePage.gameOver;
};

export const getWinner = (state) => {
    return state.gamePage.winner;
};

export const getQuestionIsClosed = (state) => {
    return state.gamePage.questionIsClosed;
};
