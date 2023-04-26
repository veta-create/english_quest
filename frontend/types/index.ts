import { type } from "@testing-library/user-event/dist/type"

export type CellType = {
    answers: string[],
    close: boolean,
    correct: number,
    key: string,
    question: string,
    score: number
};

export type Field = CellType[][] | [];

export interface ConstructorState {
    themes: Array<string>,
    field: Field,
    fieldWidth: number,
    fieldHeight: number,
    currentCellKey: string,
    creatingQuestion: boolean,
    creatingQuestionType: string
};

export interface GameState {
    fieldWidth: number,
    fieldHeight: number,
    themes: Array<string>,
    field: CellType[][] | [],
    playersCount: number,
    players: {key: string, name: string, score: number}[] | [],
    currentPlayer: string,
    currentQuestion: {key: string, question: string, answers: [string, string, string], score: 200, currentAnswer: number, correct: number},
    questionIsClosed: boolean,
    questionAnswered: number,
    gameOver: boolean,
    winner: (string | number)[];
};

export interface SettingsState {
    fieldWidth: number,
    fieldHeight: number,
    timer: number,
    settingsOpen: boolean
};

