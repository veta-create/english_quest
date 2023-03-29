import lodash from 'lodash';
const CHANGE_CURRENT_QUESTION = "CHANGE_CURRENT_QUESTION";
const CHANGE_CURRENT_ANSWER = "CHANGE_CURRENT_ANSWER";
const SCORE_COUNTER = "SCORE_COUNTER";
const PLAYER_CHANGE = "PLAYER_CHANGE";
const CELL_CLOSURE = "CELL_CLOSURE";
const GAME_OVER = "GAME_OVER";
const DETERMINE_WINNER = "DETERMINE_WINNER";
const SET_QUESTION_IS_CLOSED = "SET_QUESTION_IS_CLOSED";

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

export const gameReducer = (state = initialState, action) => {
    let stateCopy = lodash.cloneDeep(state);
    let playersCopy = lodash.cloneDeep(stateCopy.players);
    switch (action.type) {
        case CHANGE_CURRENT_QUESTION: {
            let newCurrentQuestion = lodash.cloneDeep(action.cell);
            newCurrentQuestion.currentAnswer = 0;
            stateCopy.currentQuestion = newCurrentQuestion;
            return stateCopy;
        };
        case CHANGE_CURRENT_ANSWER: {
            stateCopy.currentQuestion.currentAnswer = action.currentAnswer;
            return stateCopy;
        };
        case SCORE_COUNTER: {
            const scoreCounter = (symbol) => {
                for (let i = 0; i < stateCopy.players.length; i++) {
                    if (stateCopy.players[i].key === stateCopy.currentPlayer) {
                        if (symbol === "increase") {
                            stateCopy.players[i].score += stateCopy.currentQuestion.score;
                        };
                        if (symbol === "decrease") {
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
        case PLAYER_CHANGE: {
            const definePlayer = () => {
                let newPlayer;
                stateCopy.players.find((p, i) => {
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

        case CELL_CLOSURE: {
            for (let i = 0; i < stateCopy.field.length; i++) {
                for (let j = 0; j < stateCopy.field[i].length; j++) {
                    if (stateCopy.field[i][j].key === action.key && !stateCopy.field[i][j].close) {
                        stateCopy.field[i][j].close = true;
                    };
                };
            };
            return stateCopy;
        };

        case GAME_OVER: {
            stateCopy.gameOver = true;
            return stateCopy;
        };

        case DETERMINE_WINNER: {
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

        case SET_QUESTION_IS_CLOSED: {
            return { ...state, questionIsClosed: action.questionIsClosed };
        };

        default:
            return state;
    }
};

export const changeCurrentQuestion = (cell) => ({
    type: CHANGE_CURRENT_QUESTION,
    cell
});

export const changeCurrentAnswer = (currentAnswer) => ({
    type: CHANGE_CURRENT_ANSWER,
    currentAnswer
});

export const scoreCounter = (answerId) => ({
    type: SCORE_COUNTER,
    answerId
});

export const playerChange = () => ({
    type: PLAYER_CHANGE
})

export const cellClosure = (key) => ({
    type: CELL_CLOSURE,
    key
})

export const gameOver = () => ({
    type: GAME_OVER,
});

export const determineWinner = () => ({
    type: DETERMINE_WINNER
});

export const setQuestionIsClosed = (questionIsClosed) => ({
    type: SET_QUESTION_IS_CLOSED,
    questionIsClosed
});

export const submitAnswerButton = (answerId, key, questionAnswered) => {
    return (dispatch) => {
        dispatch(scoreCounter(answerId));
        dispatch(cellClosure(key));
        dispatch(playerChange());
        dispatch(setQuestionIsClosed(true));
        if (questionAnswered === (initialState.fieldHeight * initialState.fieldWidth - 1)) {
            dispatch(determineWinner());
            dispatch(gameOver());
        };
    };
};

export const clickOnCell = (cell) => {
    return (dispatch) => {
        if (!cell.close) {
            dispatch(changeCurrentQuestion(cell));
            dispatch(setQuestionIsClosed(false));
        } else {
            alert("Эта ячейка уже использована, пожалуйста, выберите другую");
        };
    };
};

export const timeIsOver = (answerId) => {
    return (dispatch) => {
        dispatch(scoreCounter(answerId));
        dispatch(setQuestionIsClosed(true));
        dispatch(playerChange());
    };
};