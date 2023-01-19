const SET_NEW_FIELD_SIZE = "SET_NEW_FIELD_SIZE";
const CREATE_FIELD = "CREATE_FIELD";
const ADD_ROW = "ADD_ROW";
const ADD_COLUMN = "ADD_COLUMN";

let initialState = {
    themes: ['Тематика', 'Тематика', 'Тематика'],
    field: [],
    fieldWidth: 3,
    fieldHeight: 3
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_FIELD_SIZE:
            return { ...state, fieldWidth: action.newFieldWidth, fieldHeight: action.newFieldHeigh };
        case CREATE_FIELD:
            let newField = [];
            let row = [];
            for (let i = 0; i < state.fieldHeight; i++) {
                for (let j = 0; j < state.fieldWidth; j++) {
                    row.push({ key: "0" + (j + i + 1), score: 200 * (i + 1), question: '', answers: ['', '', ''], correct: 0, close: false })
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

            let fieldCopy = [...state.field];
            for (let i = 0; i < state.fieldCopy.length; i++) {
                fieldCopy[i].push({ key: "0" + fieldCopy[i][fieldCopy[i].length], score: 200, question: '', answers: ['', '', ''], correct: 0, close: false })
                if (i !== fieldCopy.length - 1) {
                    for (let j = 0; j < fieldCopy[i + 1].length; j++) {
                        fieldCopy[i + 1][j].key = Number(fieldCopy[i + 1][j].key) + 1;
                        fieldCopy[i + 1][j].key = "0" + fieldCopy[i + 1][j].key;
                    }
                }
            }

            return { ...state, themes: [...state.themes, 'Тематика'], field: fieldCopy }
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