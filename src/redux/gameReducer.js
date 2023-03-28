import lodash from 'lodash';
const CHANGE_CURRENT_QUESTION = "CHANGE_CURRENT_QUESTION";
const CHANGE_CURRENT_ANSWER = "CHANGE_CURRENT_ANSWER";
const SCORE_COUNTER = "SCORE_COUNTER";
const PLAYER_CHANGE = "PLAYER_CHANGE";
const CELL_CLOSURE = "CELL_CLOSURE";
const GAME_OVER = "GAME_OVER";
const DETERMINE_WINNER = "DETERMINE_WINNER";
const CLOSE_QUESTION = "CLOSE_QUESTION";
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
    questionAnswered: 0,
    gameOver: false,
    winner: ['', 0],
    questionIsClosed: true
}

export const gameReducer = (state = initialState, action) => {
    let stateCopy = lodash.cloneDeep(state);
    let playersCopy = lodash.cloneDeep(stateCopy.players);
    switch (action.type) {
        case CHANGE_CURRENT_QUESTION: {
            if (action.cell.close === false) {
                let newCurrentQuestion = lodash.cloneDeep(action.cell);
                newCurrentQuestion.currentAnswer = 0;
                return {
                    ...state,
                    currentQuestion: newCurrentQuestion
                };

            } else {
                alert('Ячейка уже использована, пожалуйста, выберите другую');
                return state;
            };
        };
        case CHANGE_CURRENT_ANSWER: {
            return {
                ...state,
                currentQuestion: {
                    ...state.currentQuestion,
                    currentAnswer: action.currentAnswer
                }
            };
        };
        case SCORE_COUNTER: {
            const scoreCounter = (symbol) => {
                let playersCopy = [];
                for (let i = 0; i < state.players.length; i++) {
                    let playerCopy = { ...state.players[i] }
                    if (state.players[i].key === state.currentPlayer) {
                        if (symbol === 'plus') {
                            playerCopy.score += state.currentQuestion.score;
                        }
                        if (symbol === 'minus') {
                            if (playerCopy.score - state.currentQuestion.score > 0) {
                                playerCopy.score -= state.currentQuestion.score;
                            } else {
                                playerCopy.score = 0;
                            }
                        }
                    }
                    playersCopy.push(playerCopy);
                }
                return {
                    ...state,
                    players: playersCopy
                }
            }
            if (action.answerId === state.currentQuestion.correct) {
                const newState = scoreCounter('plus');
                return newState;
            } else {
                const newState = scoreCounter('minus');
                return newState;
            };
        };
        case PLAYER_CHANGE: {
            const definePlayer = () => {
                let newPlayer = '';
                state.players.find((p, i) => {
                    if (p.key === state.currentPlayer) {
                        if (i !== state.players.length - 1) {
                            newPlayer = i + 2;
                        } else {
                            newPlayer = 1;
                        };
                    };
                });
                return newPlayer;
            };

            return {
                ...state,
                currentPlayer: "0" + definePlayer()
            };
        };

        case CELL_CLOSURE: {
            let stateChangeFlag = false;
            for (let i = 0; i < stateCopy.field.length; i++) {
                for (let j = 0; j < stateCopy.field[i].length; j++) {
                    if (stateCopy.field[i][j].key === action.key && !stateCopy.field[i][j].close) {
                        stateCopy.field[i][j].close = true;
                        stateChangeFlag = true;
                    };
                };
            };
            if(stateChangeFlag) {
                return stateCopy;
            };
        };

        case GAME_OVER: {
            return { ...state, gameOver: true };
        };

        case DETERMINE_WINNER: {
            let winner = ["", 0];
            let scoreHitCounter = 0;
            for (let i = 0; i < playersCopy.length; i++) {
                if (playersCopy[i].score > winner[1]) {
                    winner[0] = playersCopy[i].name;
                    winner[1] = playersCopy[i].score;
                }
            }

            for (let i = 0; i < playersCopy.length; i++) {
                if (playersCopy[i].score === winner[0]) {
                    scoreHitCounter += 1;
                }
            }

            if (scoreHitCounter === playersCopy.length) {
                return { ...state, winner: ['Все', winner[1]] }
            }

            return { ...state, winner: winner };
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
        dispatch(changeCurrentQuestion(cell));
        dispatch(setQuestionIsClosed(false));
    };
};

export const timeIsOver = (answerId) => {
    return (dispatch) => {
        dispatch(scoreCounter(answerId));
        dispatch(setQuestionIsClosed(true));
        dispatch(playerChange());
    };
};