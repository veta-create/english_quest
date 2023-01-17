const CHANGE_CURRENT_QUESTION = "CHANGE_CURRENT_QUESTION";
const CHANGE_CURRENT_ANSWER = "CHANGE_CURRENT_ANSWER";
const SCORE_COUNTER = "SCORE_COUNTER";
const PLAYER_CHANGE = "PLAYER_CHANGE";
const CELL_CLOSURE = "CELL_CLOSURE"

let initialState = {
    field: [
        [{ key: "01", score: 200, question: '1?', answers: ['п', 'н', 'н'], correct: 0, close: false },
        { key: "02", score: 200, question: '2?', answers: ['п', 'н', 'н'], correct: 0, close: false },
        { key: "03", score: 200, question: '3?', answers: ['н', 'н', 'п'], correct: 2, close: false }],
        [{ key: "04", score: 400, question: '4?', answers: ['н', 'н', 'п'], correct: 2, close: false },
        { key: "05", score: 400, question: '5?', answers: ['н', 'п', 'н'], correct: 1, close: false },
        { key: "06", score: 400, question: '6?', answers: ['п', 'н', 'н'], correct: 0, close: false }],
        [{ key: "07", score: 600, question: '7?', answers: ['н', 'п', 'н'], correct: 1, close: false },
        { key: "08", score: 600, question: '8?', answers: ['н', 'п', 'н'], correct: 1, close: false },
        { key: "09", score: 600, question: '9?', answers: ['н', 'п', 'н'], correct: 1, close: false }]
    ],
    players: [{ key: "01", name: "Arut", score: 1000 }, { key: "02", name: "Veta", score: 900 }],
    currentPlayer: "01",
    currentQuestion: { key: "01", question: '1?', answers: ['п', 'н', 'н'], score: 200, currentAnswer: 0, correct: 0 }
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_QUESTION:
            if (action.cell.close === false) {
                return {
                    ...state,
                    currentQuestion: action.cell
                };

            } else {
                alert('Ячейка уже использована, пожалуйста, выберите другую');
                return state;
            }
        case CHANGE_CURRENT_ANSWER:
            return {
                ...state,
                currentQuestion: {
                    ...state.currentQuestion,
                    currentAnswer: action.currentAnswer
                }
            };
        case SCORE_COUNTER:
            const scoreCounter = (symbol) => {
                let playersCopy = [];
                for (let i = 0; i < state.players.length; i++) {
                    let playerCopy = { ...state.players[i] }
                    if (state.players[i].key === state.currentPlayer) {
                        if (symbol === 'plus') {
                            playerCopy.score += state.currentQuestion.score;
                            console.log(playerCopy)
                        }
                        if (symbol === 'minus') {
                            playerCopy.score -= state.currentQuestion.score;
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
            }
        case PLAYER_CHANGE:
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
        case CELL_CLOSURE:
            let fieldCopy = [];
            for (let i = 0; i < state.field.length; i++) {
                let row = []
                for (let j = 0; j < state.field[i].length; j++) {
                    if (state.field[i][j].key === action.key) {
                        let cellCopy = { ...state.field[i][j] };
                        cellCopy.close = true;
                        row.push(cellCopy)
                    } else {
                        row.push(state.field[i][j])
                    }
                }
                fieldCopy.push(row);
                row = [];
            }
            return {
                ...state,
                field: fieldCopy
            }
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

export const submitAnswerButton = (answerId, key) => {
    return (dispatch) => {
        dispatch(scoreCounter(answerId))
        dispatch(cellClosure(key))
        dispatch(playerChange())
    }
}