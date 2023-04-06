import { type } from "@testing-library/user-event/dist/type"

export type CellType = {
    answers: [string, string, string],
    close: boolean,
    correct: number,
    key: string,
    question: string,
    score: number
};

export type ConstructorState = {
    themes: Array<string>,
    field: CellType[][] | [],
    fieldWidth: number,
    fieldHeight: number,
    currentCellKey: string,
    creatingQuestion: boolean,
    creatingQuestionType: string
};

export type GameState = {
    fieldWidth: number,
    fieldHeight: number,
    themes: Array<string>,
    field: CellType[][] | [],
    players: {key: string, name: string, score: number}[],
    currentPlayer: string,
    currentQuestion: {key: string, question: string, answers: [string, string, string], score: 200, currentAnswer: number, correct: number},
    questionIsClosed: boolean,
    questionAnswered: number,
    gameOver: boolean,
    winner: [string, number]
};

export type SettingsState = {
    fieldWidth: number,
    fieldHeight: number,
    playersCount: number
};

