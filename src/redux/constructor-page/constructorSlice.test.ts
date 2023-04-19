import lodash from 'lodash';
import { ConstructorState } from '../../../types';
import constructorSlice, { addColumn, addRow, changeCreatingQuestionType, changeTheme, createField, createQuestion, setCurrentCell, setNewFieldSize, toggleCreatingQuestion } from './constructorSlice';

let state: ConstructorState = {
    themes: ['Тематика', 'Тематика', 'Тематика'],
    field: [],
    fieldWidth: 3,
    fieldHeight: 3,
    currentCellKey: "01",
    creatingQuestion: false,
    //text - текстовые вопросы, audio - аудио-вопросы, video - видео-вопросы
    creatingQuestionType: "text"
};

describe('field height and field width should change', () => {
    it('field width should be 4', () => {
        const action = setNewFieldSize({ newFieldWidth: 4, newFieldHeight: 4 });

        const result = constructorSlice(state, action);

        expect(result.fieldHeight).toBe(4);
    });

    it('field height should be 5', () => {
        const action = setNewFieldSize({ fnewFieldWidth: 4, newFieldHeight: 5 });

        const result = constructorSlice(state, action);

        expect(result.fieldHeight).toBe(5);
    });
});

describe('field must be created', () => {
    it('a 3 * 3 field should be created', () => {
        const action = createField();

        const result = constructorSlice(state, action);

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

        const result = constructorSlice(newState, action);

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

    const newState = constructorSlice(state, actionCreateField);

    it('a row should be added to a field of size 3 * 3, field height should become 4', () => {

        const result = constructorSlice(newState, action);

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
});

describe('a new row should be added to the field', () => {
    const actionCreateField = createField();

    const action = addColumn();

    const newState = constructorSlice(state, actionCreateField);

    it('a row should be added to a field of size 3 * 3, field width should become 4', () => {
        const result = constructorSlice(newState, action);

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

});

describe('theme must change', () => {
    it('the first theme should be "Winx"', () => {
        const action = changeTheme({ themeNumber: 0, newTheme: 'Winx' });

        const result = constructorSlice(state, action);

        expect(result.themes[0]).toBe('Winx');
    });

    it('the third theme should be "Math"', () => {
        const action = changeTheme({ themeNumber: 2, newTheme: 'Math' });

        const result = constructorSlice(state, action);

        expect(result.themes[2]).toBe('Math');
    })
});

describe('creating question must change', () => {
    it('creating question should be true', () => {
        const action = toggleCreatingQuestion(true);

        const result = constructorSlice(state, action);

        expect(result.creatingQuestion).toBe(true);
    });

    it('creating question should be false', () => {
        const action = toggleCreatingQuestion(false);

        const result = constructorSlice(state, action);

        expect(result.creatingQuestion).toBe(false);
    });
});

describe('the question for the cell should change', () => {
    const actionCreateField = createField();

    const newState = constructorSlice(state, actionCreateField);
    it('the question for the first cell should change', () => {
        const action = createQuestion({
            questionType: 'text',
            key: '01',
            newQuestion: 'Кто стал первым космонавтом?',
            answers: ['Юрий Гагарин', 'Хазбик', 'Николас Кейдж'],
            correctAnswer: 1
        });

        const result = constructorSlice(newState, action);

        expect(result.field[0][0]).toEqual({
            key: '01',
            score: 200,
            question: 'Кто стал первым космонавтом?',
            answers: ['Юрий Гагарин', 'Хазбик', 'Николас Кейдж'],
            correct: 0,
            close: false
        });
    });
});

describe('current cell must change', () => {
    it('cell with key "02" should become current', () => {
        const action = setCurrentCell("02");

        const result = constructorSlice(state, action);

        expect(result.currentCellKey).toBe("02");
    });
});

describe('creating question type must change', () => {
    it('creating question type should be "text"', () => {
        const action = changeCreatingQuestionType('text');

        const result = constructorSlice(state, action);

        expect(result.creatingQuestionType).toBe('text');
    });

    it('creating question type should be "audio"', () => {
        const action = changeCreatingQuestionType('audio');

        const result = constructorSlice(state, action);

        expect(result.creatingQuestionType).toBe('audio');
    });

    it('creating question type should be "video"', () => {
        const action = changeCreatingQuestionType('video');

        const result = constructorSlice(state, action);

        expect(result.creatingQuestionType).toBe('video');
    });
});
