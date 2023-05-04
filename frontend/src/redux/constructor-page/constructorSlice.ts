import { createSlice } from '@reduxjs/toolkit';
import { ConstructorState } from '../../../types';

let initialState: ConstructorState = {
    themes: ['', '', ''],
    field: [],
    fieldWidth: 3,
    fieldHeight: 3,
    currentCellKey: "01",
    creatingQuestion: false,
    //text - текстовые вопросы, audio - аудио-вопросы, video - видео-вопросы
    creatingQuestionType: "text"
};

const constructorSlice = createSlice({
    name: "constructor",
    initialState,
    reducers: {
        setNewFieldSize(state, action) {
            state.fieldWidth = action.payload.newFieldWidth;
            state.fieldHeight = action.payload.newFieldHeight;
        },
        createField(state) {
            let newField = [];
            let row = [];
            let key = 1;

            for (let i = 0; i < state.fieldHeight; i++) {
                for (let j = 0; j < state.fieldWidth; j++) {
                    row.push({ key: "0" + key, score: 200 * (i + 1), question: '', answers: ['', '', ''], correct: 0, close: false })
                    key++;
                };
                newField.push(row);
                row = [];
            };
            let emptyArray = new Array(state.fieldWidth);
            state.field = newField;
            state.themes = emptyArray.fill("");
        },
        addRow(state) {
            let lastKey = Number(state.field[state.fieldHeight - 1][state.fieldWidth - 1].key) + 1;
            let newRow = [];

            for (let i = 0; i < state.fieldWidth; i++) {
                newRow.push({ key: "0" + lastKey, score: 200 * (state.fieldHeight + 1), question: '', answers: ['', '', ''], correct: 0, close: false })
                lastKey += 1;
            };

            state.field = [...state.field, newRow];
            state.fieldHeight = state.fieldHeight + 1;
            return state;
        },
        addColumn(state) {
            for (let i = 0; i < state.field.length; i++) {
                let key = Number(state.field[i][state.fieldWidth - 1].key) + 1;
                state.field[i].push({ key: "0" + key, score: state.field[i][0].score, question: '', answers: ['', '', ''], correct: 0, close: false });
                if (i !== state.fieldHeight - 1) {
                    for (let j = 0; j < state.field[i + 1].length; j++) {
                        state.field[i + 1][j].key = "0" + (Number(state.field[i + 1][j].key) + (i + 1));
                    };
                };
            };

            state.themes = [...state.themes, "Тематика"];
            state.fieldWidth = state.fieldWidth + 1;
        },
        toggleCreatingQuestion: (state, action) => {
            state.creatingQuestion = action.payload;
        },
        createQuestion: (state, action) => {
            for (let i = 0; i < state.field.length; i++) {
                for (let j = 0; j < state.field[i].length; j++) {
                    if (state.field[i][j].key === action.payload.key) {

                        if (action.payload.questionType === "text") {
                            state.field[i][j].question = action.payload.newQuestion;
                        };

                        if (action.payload.questionType === "audio") {
                            //фунцкия, генерирующая путь к аудио файл
                            state.field[i][j].question = action.payload.newQuestion;
                        };

                        if (action.payload.questionType === "video") {
                            //фунцкия, генерирующая путь к аудио файл
                            state.field[i][j].question = action.payload.newQuestion;
                        };
                        
                        state.field[i][j].type = action.payload.type;
                        state.field[i][j].answers = action.payload.answers;
                        state.field[i][j].correct = action.payload.correctAnswer - 1;
                    }
                }
            }
        },
        setCurrentCell: (state, action) => {
            state.currentCellKey = action.payload;
        },
        changeTheme: (state, action) => {
            state.themes[action.payload.themeNumber] = action.payload.newTheme;
        },
        changeCreatingQuestionType: (state, action) => {
            state.creatingQuestionType = action.payload;
        }
    }
});

export default constructorSlice.reducer;
export const { setNewFieldSize,
    createField,
    addRow,
    addColumn,
    toggleCreatingQuestion,
    createQuestion,
    setCurrentCell,
    changeTheme,
    changeCreatingQuestionType } = constructorSlice.actions;