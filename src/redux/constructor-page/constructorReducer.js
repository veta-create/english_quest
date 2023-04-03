import lodash from "lodash";
const SET_NEW_FIELD_SIZE = "SET_NEW_FIELD_SIZE";
const CREATE_FIELD = "CREATE_FIELD";
const ADD_ROW = "ADD_ROW";
const ADD_COLUMN = "ADD_COLUMN";
const CREATE_QUESTION = "CREATE_QUESTION";
const TOGGLE_CREATING_QUESTION = "TOGGLE_CREATING_QUESTION";
const SET_CURRENT_CELL = "SET_CURRENT_CELL";
const CHANGE_THEME = "CHANGE_THEME";
const CHANGE_CREATING_QUESTION_TYPE = "CHANGE_CREATING_QUESTION_TYPE";

let initialState = {
    themes: ['Тематика', 'Тематика', 'Тематика'],
    field: [],
    fieldWidth: 3,
    fieldHeight: 3,
    currentCell: "01",
    creatingQuestion: false,
    //text - текстовые вопросы, audio - аудио-вопросы, video - видео-вопросы
    creatingQuestionType: "text"
};

export const constructorReducer = (state = initialState, action) => {
    const stateCopy = lodash.cloneDeep(state);
    const fieldCopy = lodash.cloneDeep(stateCopy.field);
    switch (action.type) {
        case SET_NEW_FIELD_SIZE: {
            stateCopy.fieldWidth = action.newFieldWidth;
            stateCopy.fieldHeight = action.newFieldHeigh;
            return stateCopy;
        };
        case CREATE_FIELD: {
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
        case ADD_ROW: {
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
        case ADD_COLUMN: {
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
        case TOGGLE_CREATING_QUESTION: {
            stateCopy.creatingQuestion = action.creatingQuestion;
            return stateCopy;
        };
        case CREATE_QUESTION: {
            for (let i = 0; i < stateCopy.field.length; i++) {
                for (let j = 0; j < stateCopy.field[i].length; j++) {
                    if (stateCopy.field[i][j].key === action.key) {

                        if (action.questionType === "text") {
                            stateCopy.field[i][j].question = action.newQuestion;
                        };

                        if (action.questionType === "audio") {
                            //фунцкия, генерирующая путь к аудио файл
                        };

                        if (action.questionType === "video") {
                            //фунцкия, генерирующая путь к аудио файл
                        };

                        stateCopy.field[i][j].answers = action.answers;
                        stateCopy.field[i][j].correct = action.correctAnswer - 1;
                    }
                }
            }
            return stateCopy;
        };
        case SET_CURRENT_CELL: {
            stateCopy.currentCell = action.currentCell;
            return stateCopy;
        };
        case CHANGE_THEME: {
            stateCopy.themes[action.themeNumber] = action.newTheme;
            return stateCopy;
        };
        case CHANGE_CREATING_QUESTION_TYPE: {
            stateCopy.creatingQuestionType = action.creatingQuestionType;
            return stateCopy;
        };
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

export const createQuestion = (questionType, key, newQuestion, answers, correctAnswer) => ({
    type: CREATE_QUESTION,
    questionType,
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

export const changeCreatingQuestionType = (creatingQuestionType) => ({
    type: CHANGE_CREATING_QUESTION_TYPE,
    creatingQuestionType
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

export const addNewQuestion = (type, key, newQuestion, answers, correctAnswer) => {
    return (dispatch) => {
        dispatch(createQuestion(type, key, newQuestion, answers, correctAnswer))
        dispatch(toggleCreatingQuestion(false))
    };
};