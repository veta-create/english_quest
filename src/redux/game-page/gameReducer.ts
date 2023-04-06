import lodash from 'lodash';

let initialState = {
    fieldWidth: 3,
    fieldHeight: 3,
    themes: ["BTS", "Minecraft", "Олимпийские игры"],
    field: [
        [{ key: "01", score: 200, question: '1?', answers: ['п', 'н', 'н'], correct: 0, close: false },
        { key: "02", score: 200, question: 'Как добраться до Эндермира?', answers: ['Око Края', 'Через пещеру', 'В кусты'], correct: 0, close: false },
        { key: "03", score: 200, question: '3?', answers: ['н', 'н', 'п'], correct: 2, close: false }],
        [{ key: "04", score: 400, question: '4?', answers: ['н', 'н', 'п'], correct: 2, close: false },
        { key: "05", score: 400, question: '5?', answers: ['н', 'п', 'н'], correct: 1, close: false },
        { key: "06", score: 400, question: '6?', answers: ['п', 'н', 'н'], correct: 0, close: false }],
        [{ key: "07", score: 600, question: '7?', answers: ['н', 'п', 'н'], correct: 1, close: false },
        { key: "08", score: 600, question: '8?', answers: ['н', 'п', 'н'], correct: 1, close: false },
        { key: "09", score: 600, question: '9?', answers: ['н', 'п', 'н'], correct: 1, close: false }]
    ],
    players: [{ key: "01", name: "Arut", score: 0 }, { key: "02", name: "Veta", score: 0 }],
    currentPlayer: "01",
    currentQuestion: { key: "01", question: '1?', answers: ['п', 'н', 'н'], score: 200, currentAnswer: 0, correct: 0 },
    questionIsClosed: true,
    questionAnswered: 0,
    gameOver: false,
    winner: ['', 0]
};

export interface ChangeCurrentQuestion {
    type: "CHANGE_CURRENT_QUESTION",
    cell: { key: string, answers: [string, string, string], close: boolean, correct: number, question: string, score: number }
};

export interface ChangeCurrentAnswer {
    type: "CHANGE_CURRENT_ANSWER",
    currentAnswer: number
};

export interface ScoreCounter {
    type: "SCORE_COUNTER",
    answerId: number
};

export interface PlayerChange {
    type: "PLAYER_CHANGE";
}

export interface CellClosure {
    type: "CELL_CLOSURE",
    key: string
};

export interface SetGameOver {
    type: "SET_GAME_OVER"
};

export interface DetermineWinner {
    type: "DETERMINE_WINNER",
};

export interface SetQuestionIsClosed {
    type: "SET_QUESTION_IS_CLOSED",
    questionIsClosed: boolean
};

export interface ChangeQuestionAnswered {
    type: "CHANGE_QUESTION_ANSWERED"
};

type GameActions = ChangeCurrentQuestion | ChangeCurrentAnswer | ScoreCounter | PlayerChange | CellClosure | SetGameOver | DetermineWinner
    | SetQuestionIsClosed | ChangeQuestionAnswered

export const gameReducer = (state = initialState, action: GameActions) => {
    let stateCopy = lodash.cloneDeep(state);
    switch (action.type) {
        case "CHANGE_CURRENT_QUESTION": {
            let newCurrentQuestion = lodash.cloneDeep(action.cell);
            newCurrentQuestion.currentAnswer = 0;
            stateCopy.currentQuestion = newCurrentQuestion;
            return stateCopy;
        };
        case "CHANGE_CURRENT_ANSWER": {
            stateCopy.currentQuestion.currentAnswer = action.currentAnswer;
            return stateCopy;
        };
        case "SCORE_COUNTER": {
            const scoreCounter = (operation: string) => {
                for (let i = 0; i < stateCopy.players.length; i++) {
                    if (stateCopy.players[i].key === stateCopy.currentPlayer) {
                        if (operation === "increase") {
                            stateCopy.players[i].score += stateCopy.currentQuestion.score;
                        };
                        if (operation === "decrease") {
                            if (stateCopy.players[i].score - stateCopy.currentQuestion.score > 0) {
                                stateCopy.players[i].score -= stateCopy.currentQuestion.score;
                            } else {
                                stateCopy.players[i].score = 0;
                            };
                        };
                    };
                };
                return stateCopy;
            };

            if (action.answerId === stateCopy.currentQuestion.correct) {
                return scoreCounter("increase");
            } else {
                return scoreCounter("decrease");
            };
        };
        case "PLAYER_CHANGE": {
            const definePlayer = () => {
                let newPlayer;
                stateCopy.players.find((p: {key: string, name: string, score: number}, i: number) => {
                    if (p.key === stateCopy.currentPlayer) {
                        if (i !== stateCopy.players.length - 1) {
                            newPlayer = i + 2;
                        } else {
                            newPlayer = 1;
                        };
                    };
                });
                return newPlayer;
            };
            stateCopy.currentPlayer = "0" + definePlayer();
            return stateCopy;
        };

        case "CELL_CLOSURE": {
            for (let i = 0; i < stateCopy.field.length; i++) {
                for (let j = 0; j < stateCopy.field[i].length; j++) {
                    if (stateCopy.field[i][j].key === action.key && !stateCopy.field[i][j].close) {
                        stateCopy.field[i][j].close = true;
                    };
                };
            };
            return stateCopy;
        };

        case "SET_GAME_OVER": {
            stateCopy.gameOver = true;
            return stateCopy;
        };

        case "DETERMINE_WINNER": {
            let winner = ["", 0];
            let scoreHitCounter = 0;

            for (let i = 0; i < stateCopy.players.length; i++) {
                if (stateCopy.players[i].score > winner[1]) {
                    winner[0] = stateCopy.players[i].name;
                    winner[1] = stateCopy.players[i].score;
                };
            };

            for (let i = 0; i < stateCopy.players.length; i++) {
                if (stateCopy.players[i].score === winner[1]) {
                    scoreHitCounter += 1;
                };
            };

            if (scoreHitCounter === stateCopy.players.length) {
                winner[0] = 'Все';
            };

            stateCopy.winner = winner;

            return stateCopy;
        };

        case "SET_QUESTION_IS_CLOSED": {
            stateCopy.questionIsClosed = action.questionIsClosed;
            return stateCopy;
        };

        case "CHANGE_QUESTION_ANSWERED": {
            stateCopy.questionAnswered += 1;
            return stateCopy;
        };

        default:
            return state;
    }
};

export const changeCurrentQuestion = (cell: {
    key: string,
    answers: [string, string, string],
    close: boolean, correct: number,
    question: string,
    score: number
}) => ({
    type: "CHANGE_CURRENT_QUESTION" as const,
    cell
});

export const changeCurrentAnswer = (currentAnswer: number) => ({
    type: "CHANGE_CURRENT_ANSWER" as const,
    currentAnswer
});

export const scoreCounter = (answerId: number) => ({
    type: "SCORE_COUNTER" as const,
    answerId
});

export const playerChange = () => ({
    type: "PLAYER_CHANGE" as const
});

export const cellClosure = (key: string) => ({
    type: "CELL_CLOSURE" as const,
    key
});

export const setGameOver = () => ({
    type: "SET_GAME_OVER" as const,
});

export const determineWinner = () => ({
    type: "DETERMINE_WINNER" as const
});

export const setQuestionIsClosed = (questionIsClosed: boolean) => ({
    type: "SET_QUESTION_IS_CLOSED" as const,
    questionIsClosed
});

export const changeQuestionAnswered = () => ({
    type: "CHANGE_QUESTION_ANSWERED" as const
});