import { type } from "@testing-library/user-event/dist/type";
import lodash from "lodash";
import { ConstructorState } from "../../../types";

let initialState: ConstructorState = {
    themes: ['Тематика', 'Тематика', 'Тематика'],
    field: [],
    fieldWidth: 3,
    fieldHeight: 3,
    currentCellKey: "01",
    creatingQuestion: false,
    //text - текстовые вопросы, audio - аудио-вопросы, video - видео-вопросы
    creatingQuestionType: "text"
};

export interface CreateField {
    type: "CREATE_FIELD"
};

export interface SetNewFieldSize {
    type: "SET_NEW_FIELD_SIZE",
    newFieldWidth: number,
    newFieldHeight: number
};

export interface AddRow {
    type: "ADD_ROW"
};

export interface AddColumn {
    type: "ADD_COLUMN"
};

export interface ToggleCreatingQuestion {
    type: "TOGGLE_CREATING_QUESTION",
    creatingQuestion: boolean
};

export interface CreateQuestion {
    type: "CREATE_QUESTION",
    questionType: string,
    key: string,
    newQuestion: string,
    answers: [string, string, string],
    correctAnswer: number
};

export interface SetCurrentCell {
    type: "SET_CURRENT_CELL",
    currentCellKey: string
};

export interface ChangeTheme {
    type: "CHANGE_THEME",
    themeNumber: number,
    newTheme: string
};

export interface ChangeCreatingQuestionType {
    type: "CHANGE_CREATING_QUESTION_TYPE",
    creatingQuestionType: string
};

type ConstructorActions = CreateField | SetNewFieldSize | AddRow | AddColumn | ToggleCreatingQuestion | CreateQuestion | SetCurrentCell 
| ChangeTheme | ChangeCreatingQuestionType;

export const constructorReducer = (state:ConstructorState = initialState, action: ConstructorActions) => {
    const stateCopy = lodash.cloneDeep(state);
    switch (action.type) {
        case "SET_NEW_FIELD_SIZE": {
            stateCopy.fieldWidth = action.newFieldWidth;
            stateCopy.fieldHeight = action.newFieldHeight;
            return stateCopy;
        };
        case "CREATE_FIELD": {
            let newField = [];
            let row = [];
            let key = 1;

            for (let i = 0; i < stateCopy.fieldHeight; i++) {
                for (let j = 0; j < stateCopy.fieldWidth; j++) {
                    row.push({ key: "0" + key, score: 200 * (i + 1), question: '', answers: ['', '', ''], correct: 0, close: false })
                    key++
                };
                newField.push(row);
                row = [];
            };

            let emptyArray = new Array(state.fieldWidth);
            stateCopy.field = newField;
            stateCopy.themes = emptyArray.fill("Тематика");
            return stateCopy;
        };
        case "ADD_ROW": {
            let lastKey = Number(stateCopy.field[stateCopy.fieldHeight - 1][stateCopy.fieldWidth - 1].key) + 1;
            let newRow = [];

            for (let i = 0; i < stateCopy.fieldWidth; i++) {
                newRow.push({ key: "0" + lastKey, score: 200 * (stateCopy.fieldHeight + 1), question: '', answers: ['', '', ''], correct: 0, close: false })
                lastKey += 1;
            };

            stateCopy.field = [...stateCopy.field, newRow];
            stateCopy.fieldHeight = stateCopy.fieldHeight + 1;
            return stateCopy;
        };
        case "ADD_COLUMN": {
            for (let i = 0; i < stateCopy.field.length; i++) {
                let key = Number(stateCopy.field[i][stateCopy.fieldWidth - 1].key) + 1;
                stateCopy.field[i].push({ key: "0" + key, score: stateCopy.field[i][0].score, question: '', answers: ['', '', ''], correct: 0, close: false });
                if (i !== stateCopy.fieldHeight - 1) {
                    for (let j = 0; j < stateCopy.field[i + 1].length; j++) {
                        stateCopy.field[i + 1][j].key = "0" + (Number(stateCopy.field[i + 1][j].key) + (i + 1));
                    };
                };
            };

            stateCopy.themes = [...stateCopy.themes, "Тематика"];
            stateCopy.fieldWidth = stateCopy.fieldWidth + 1;
            return stateCopy;
        };
        case "TOGGLE_CREATING_QUESTION": {
            stateCopy.creatingQuestion = action.creatingQuestion;
            return stateCopy;
        };
        case "CREATE_QUESTION": {
            for (let i = 0; i < stateCopy.field.length; i++) {
                for (let j = 0; j < stateCopy.field[i].length; j++) {
                    if (stateCopy.field[i][j].key === action.key) {

                        if (action.questionType === "text") {
                            stateCopy.field[i][j].question = action.newQuestion;
                        };

                        if (action.questionType === "audio") {
                            //фунцкия, генерирующая путь к аудио файл
                            stateCopy.field[i][j].question = action.newQuestion;
                        };

                        if (action.questionType === "video") {
                            //фунцкия, генерирующая путь к аудио файл
                            stateCopy.field[i][j].question = action.newQuestion;
                        };

                        stateCopy.field[i][j].answers = action.answers;
                        stateCopy.field[i][j].correct = action.correctAnswer - 1;
                    }
                }
            }
            return stateCopy;
        };
        case "SET_CURRENT_CELL": {
            stateCopy.currentCellKey = action.currentCellKey;
            return stateCopy;
        };
        case "CHANGE_THEME": {
            stateCopy.themes[action.themeNumber] = action.newTheme;
            return stateCopy;
        };
        case "CHANGE_CREATING_QUESTION_TYPE": {
            stateCopy.creatingQuestionType = action.creatingQuestionType;
            return stateCopy;
        };
        default:
            return state;
    };
};

export const createField = () => ({
    type: "CREATE_FIELD" as const
});

export const setNewFieldSize = (newFieldWidth: number, newFieldHeight: number) => ({
    type: "SET_NEW_FIELD_SIZE" as const,
    newFieldWidth,
    newFieldHeight
});

export const addRow = () => ({
    type: "ADD_ROW" as const
});

export const addColumn = () => ({
    type: "ADD_COLUMN" as const
});

export const toggleCreatingQuestion = (creatingQuestion: boolean) => ({
    type: "TOGGLE_CREATING_QUESTION" as const,
    creatingQuestion
});

export const createQuestion = (questionType: string, key: string, newQuestion: string, answers: [string, string, string], correctAnswer: number) => ({
    type: "CREATE_QUESTION" as const,
    questionType,
    key,
    newQuestion,
    answers,
    correctAnswer
});

export const setCurrentCell = (currentCellKey: string) => ({
    type: "SET_CURRENT_CELL" as const,
    currentCellKey
});

export const changeTheme = (themeNumber: number, newTheme: string) => ({
    type: "CHANGE_THEME" as const,
    themeNumber,
    newTheme
});

export const changeCreatingQuestionType = (creatingQuestionType: string) => ({
    type: "CHANGE_CREATING_QUESTION_TYPE" as const,
    creatingQuestionType
});