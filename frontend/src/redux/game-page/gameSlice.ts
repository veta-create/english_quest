import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GameState } from '../../../types';

const initialState: GameState = {
    fieldWidth: 3,
    fieldHeight: 3,
    themes: ["BTS", "Minecraft", "Олимпийские игры"],
    field: [],
    playersCount: 0,
    players: [{ key: "test", name: "none", score: 0 }],
    currentPlayer: "01",
    currentQuestion: { type: "text", key: "01", question: '1?', answers: ['п', 'н', 'н'], score: 200, currentAnswer: 0, correct: 0 },
    questionIsClosed: true,
    questionAnswered: 0,
    gameOver: false,
    winner: ['', 0]
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        changeCurrentQuestion(state, action) {
            state.currentQuestion.key = action.payload.key;
            state.currentQuestion.question = action.payload.question;
            state.currentQuestion.answers = action.payload.answers;
            state.currentQuestion.score = action.payload.score;
            state.currentQuestion.correct = action.payload.correct;
            state.currentQuestion.currentAnswer = 0;
            state.currentQuestion.type = action.payload.type;
        },
        changeCurrentAnswer(state, action) {
            state.currentQuestion.currentAnswer = action.payload;
        },
        scoreCounter(state, action) {
            const scoreCounter = (operation: string) => {
                for (let i = 0; i < state.players.length; i++) {
                    if (state.players[i].key === action.payload.playerKey) {
                        if (operation === "increase") {
                            state.players[i].score += state.currentQuestion.score;
                        };
                        if (operation === "decrease") {
                            if (state.players[i].score - state.currentQuestion.score > 0) {
                                state.players[i].score -= state.currentQuestion.score;
                            } else {
                                state.players[i].score = 0;
                            };
                        };
                    };
                };
                return state;
            };

            if (action.payload.answerId === state.currentQuestion.correct) {
                scoreCounter("increase");
            } else {
                scoreCounter("decrease");
            };
        },
        playerChange(state) {
            const definePlayer = () => {
                let newPlayer;
                state.players.find((p: { key: string, name: string, score: number }, i: number) => {
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
            state.currentPlayer = "0" + definePlayer();
        },
        cellClosure: (state, action) => {
            for (let i = 0; i < state.field.length; i++) {
                for (let j = 0; j < state.field[i].length; j++) {
                    if (state.field[i][j].key === action.payload && !state.field[i][j].close) {
                        state.field[i][j].close = true;
                    };
                };
            };
        },
        setGameOver: (state) => {
            state.gameOver = true;
        },
        determineWinner: (state) => {
            let winner = ["", 0];
            let scoreHitCounter = 0;

            for (let i = 0; i < state.players.length; i++) {
                if (state.players[i].score > Number(winner[1])) {
                    winner[0] = state.players[i].name;
                    winner[1] = state.players[i].score;
                };
            };

            for (let i = 0; i < state.players.length; i++) {
                if (state.players[i].score === winner[1]) {
                    scoreHitCounter += 1;
                };
            };

            if (scoreHitCounter === state.players.length) {
                winner[0] = 'Все';
            };

            state.winner = winner;
        },
        setQuestionIsClosed: (state, action) => {
            state.questionIsClosed = action.payload;
        },
        changeQuestionAnswered: (state) => {
            state.questionAnswered += 1;
        },
        addNewPlayers: (state, action) => {
            const players = [];
            for (let i = 0; i < action.payload.length; i++) {
                players.push({ key: "0" + (i + 1), name: action.payload[i], score: 0 });
            };
            state.players = players;
            state.playersCount = players.length;
        },
        setField: (state, action) => {
            state.field = action.payload.field;
            state.themes = action.payload.themes;
            state.fieldWidth = action.payload.fieldWidth;
            state.fieldHeight = action.payload.fieldHeight;
        }
    }
});

export default gameSlice.reducer;
export const { changeCurrentQuestion,
    changeCurrentAnswer,
    scoreCounter,
    playerChange,
    cellClosure,
    setGameOver,
    determineWinner,
    setQuestionIsClosed,
    changeQuestionAnswered,
    addNewPlayers,
    setField } = gameSlice.actions;