import lodash from 'lodash';
import { addColumn, addRow, constructorReducer, createField, setNewFieldSize } from "./constructorReducer";

let state = {
    themes: ['Тематика', 'Тематика', 'Тематика'],
    field: [],
    fieldWidth: 3,
    fieldHeight: 3,
    currentCell: "01",
    creatingQuestion: false,
    //text - текстовые вопросы, audio - аудио-вопросы, video - видео-вопросы
    creatingQuestionType: "text"
};

describe('field height and field width should change', () => {
    it('field width should be 4', () => {
        const action = setNewFieldSize(4, 4);

        const result = constructorReducer(state, action);

        expect(result.fieldHeight).toBe(4);
    });

    it('field height should be 5', () => {
        const action = setNewFieldSize(4, 5);

        const result = constructorReducer(state, action);

        expect(result.fieldHeight).toBe(5);
    });
});

describe('field field must be created', () => {
    it('a 3 * 3 field should be created', () => {
        const action = createField();

        const result = constructorReducer(state, action);

        expect(result.field).toEqual([
            [{ key: "01", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "02", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "03", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "04", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "05", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "06", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "07", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "08", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "09", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false }]
        ]);
    });

    it('a 6 * 5 field should be created', () => {
        const action = createField();

        const newState = lodash.cloneDeep(state);

        newState.fieldWidth = 6;
        newState.fieldHeight = 5;

        const result = constructorReducer(newState, action);

        expect(result.field).toEqual([
            [{ key: "01", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "02", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "03", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "04", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "05", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "06", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },],
            [{ key: "07", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "08", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "09", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "010", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "011", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "012", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "013", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "014", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "015", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "016", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "017", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "018", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "019", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "020", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "021", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "022", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "023", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "024", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "025", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "026", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "027", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "028", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "029", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "030", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false }]
        ]);
    });
});

describe('a new row should be added to the field', () => {
    const actionCreateField = createField();

    const action = addRow();

    const newState = constructorReducer(state, actionCreateField);

    it('a row should be added to a field of size 3 * 3, field height should become 4', () => {

        const result = constructorReducer(newState, action);

        expect(result.field).toEqual([
            [{ key: "01", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "02", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "03", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "04", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "05", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "06", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "07", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "08", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "09", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "010", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "011", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "012", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false }]
        ]);

        expect(result.fieldHeight).toBe(4);
    });

    it('a row should be added to a field of size 3 * 4, field height should become 5', () => {
        newState.field = [
            [{ key: "01", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "02", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "03", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "04", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "05", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "06", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "07", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "08", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "09", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "010", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "011", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "012", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false }]
        ];

        newState.fieldHeight = 4;

        const result = constructorReducer(newState, action);

        expect(result.field).toEqual([
            [{ key: "01", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "02", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "03", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "04", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "05", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "06", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "07", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "08", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "09", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "010", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "011", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "012", score: 800, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "013", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "014", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "015", score: 1000, question: '', answers: ['', '', ''], correct: 0, close: false }],
        ]);

        expect(result.fieldHeight).toBe(5);
    });
});

describe('a new row should be added to the field', () => {
    const actionCreateField = createField();

    const action = addColumn();

    const newState = constructorReducer(state, actionCreateField);

    it('a row should be added to a field of size 3 * 3, field width should become 4', () => {
        const result = constructorReducer(newState, action);

        expect(result.field).toEqual([
            [{ key: "01", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "02", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "03", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "04", score: 200, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "05", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "06", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "07", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "08", score: 400, question: '', answers: ['', '', ''], correct: 0, close: false }],
            [{ key: "09", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "010", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "011", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false },
            { key: "012", score: 600, question: '', answers: ['', '', ''], correct: 0, close: false }]
        ]);

        expect(result.fieldWidth).toBe(4);
    });

})