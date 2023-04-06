import { RootState } from "../store";

export const getField = (state: RootState) => {
    return state.gamePage.field;
};

export const getThemes = (state: RootState) => {
    return state.gamePage.themes;
};

export const getPlayers = (state: RootState) => {
    return state.gamePage.players;
};

export const getCurrentPlayer = (state: RootState) => {
    return state.gamePage.currentPlayer;
};

export const getCurrentQuestion = (state: RootState) => {
    return state.gamePage.currentQuestion;
};

export const getQuestionAnswered = (state: RootState) => {
    return state.gamePage.questionAnswered;
};

export const getGameOver = (state: RootState) => {
    return state.gamePage.gameOver;
};

export const getWinner = (state: RootState) => {
    return state.gamePage.winner;
};

export const getQuestionIsClosed = (state: RootState) => {
    return state.gamePage.questionIsClosed;
};

export const getFieldWidth = (state: RootState) => {
    return state.gamePage.fieldWidth;
};

export const getFieldHeight = (state: RootState) => {
    return state.gamePage.fieldHeight
};
