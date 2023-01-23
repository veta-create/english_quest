import lodash from "lodash"
const SET_NEW_FIELD_SIZE = "SET_NEW_FIELD_SIZE";
const CREATE_FIELD = "CREATE_FIELD";
const ADD_ROW = "ADD_ROW";
const ADD_COLUMN = "ADD_COLUMN";
const ADD_THEME = "ADD_THEME";
const CREATE_QUESTION = "CREATE_QUESTION";
const TOGGLE_CREATING_QUESTION = "TOGGLE_CREATING_QUESTION";
const SET_CURRENT_CELL = "SET_CURRENT_CELL";
const CHANGE_THEME = "CHANGE_THEME";

let initialState = {
    themes: ['Тематика', 'Тематика', 'Тематика'],
    field: [],
    fieldWidth: 3,
    fieldHeight: 3,
    currentCell: "01", 
    creatingQuestion: false
}

export const constructorReducer = (state = initialState, action) => {
    const stateCopy = lodash.cloneDeep(state);
    const fieldCopy = lodash.cloneDeep(stateCopy.field);
    const themesCopy = lodash.cloneDeep(stateCopy.themes);
    switch (action.type) {
        case SET_NEW_FIELD_SIZE:
            return { ...state, fieldWidth: action.newFieldWidth, fieldHeight: action.newFieldHeigh };
        case CREATE_FIELD:
            let newField = [];
            let row = [];
            let key = 1
            for (let i = 0; i < state.fieldHeight; i++) {
                for (let j = 0; j < state.fieldWidth; j++) {
                    row.push({ key: "0" + key, score: 200 * (i + 1), question: '', answers: ['', '', ''], correct: 0, close: false })
                    key++
                };
                newField.push(row);
                row = [];
            };
            let emptyArray = new Array(state.fieldWidth);
            return { ...state, field: newField, themes: emptyArray.fill('Тематика') }
        case ADD_ROW:
            let lastIndex = state.field[state.field.length - 1].length;
            let newRow = [];
            for (let i = 0; i < state.fieldWidth; i++) {
                newRow.push({ key: "0" + lastIndex, score: 200 * (state.fieldHeight + 1), question: '', answers: ['', '', ''], correct: 0, close: false })
                lastIndex += 1;
            };
            return {
                ...state,
                field: [...state.field, newRow],
                fieldHeight: state.fieldHeight + 1
            };
        case ADD_COLUMN:
            for (let i = 0; i < fieldCopy.length; i++) {
                fieldCopy[i].push({ key: "0" + fieldCopy[i][fieldCopy[i].length], score: fieldCopy[i][0].score, question: '', answers: ['', '', ''], correct: 0, close: false })
                if (i !== fieldCopy.length - 1) {
                    for (let j = 0; j < fieldCopy[i + 1].length; j++) {
                        fieldCopy[i + 1][j].key = Number(fieldCopy[i + 1][j].key) + 1;
                        fieldCopy[i + 1][j].key = "0" + fieldCopy[i + 1][j].key;
                    }
                }
            }

            return {
                ...state,
                themes: [...state.themes, 'Тематика'],
                field: fieldCopy,
                fieldWidth: state.fieldWidth + 1
            }

        case ADD_THEME:
            const copyThemes = [...state.themes];
            copyThemes[action.themeId] = action.newTheme;
            return { ...state, themes: copyThemes };

        case TOGGLE_CREATING_QUESTION:
            return { ...state, creatingQuestion: action.creatingQuestion };

        case CREATE_QUESTION:
            for (let i = 0; i < fieldCopy.length; i++) {
                for (let j = 0; j < fieldCopy[i].length; j++) {
                    if (fieldCopy[i][j].key === action.key) {
                        fieldCopy[i][j].question = action.newQuestion;
                        fieldCopy[i][j].answers = action.answers;
                        // надо обработать ошибку, если ввели неккоректный ответ
                        fieldCopy[i][j].correct = action.correctAnswer - 1;
                    }
                }
            }
            return { ...state, field: fieldCopy}
        case SET_CURRENT_CELL:
            return {...state, currentCell: action.currentCell};

        case CHANGE_THEME:
            for(let i = 0; i < themesCopy.length; i++) {
                if(i === action.themeNumber) {
                    themesCopy[i] = action.newTheme;
                };
            };

            return {...state, themes: themesCopy}
        default:
            return state;
    };
};

export const createField = () => ({
    type: CREATE_FIELD
});

export const setNewFieldSize = (newFieldWidth, newFieldHeigh) => ({
    type: SET_NEW_FIELD_SIZE,
    newFieldWidth,
    newFieldHeigh
});

export const addRow = () => ({
    type: ADD_ROW
});

export const addColumn = () => ({
    type: ADD_COLUMN
});

export const toggleCreatingQuestion = (creatingQuestion) => ({
    type: TOGGLE_CREATING_QUESTION,
    creatingQuestion
});

export const createQuestion = (key, newQuestion, answers, correctAnswer) => ({
    type: CREATE_QUESTION,
    key,
    newQuestion,
    answers,
    correctAnswer
});

export const setCurrentCell = (currentCell) => ({
    type: SET_CURRENT_CELL,
    currentCell
});

export const changeTheme = (themeNumber, newTheme) => ({
    type: CHANGE_THEME,
    themeNumber,
    newTheme
});

export const clickOnCell = (currentCell) => {
    return (dispatch) => {
        dispatch(toggleCreatingQuestion(true));
        dispatch(setCurrentCell(currentCell));
    };
};

export const createFieldFromTemplate = (newFieldWidth, newFieldHeigh) => {
    return (dispatch) => {
        dispatch(setNewFieldSize(newFieldWidth, newFieldHeigh))
        dispatch(createField())
    };
};

export const addNewQuestion = (key, newQuestion, answers, correctAnswer) => {
    return (dispatch) => {
        dispatch(createQuestion(key, newQuestion, answers, correctAnswer))
        dispatch(toggleCreatingQuestion(false))
    };
};