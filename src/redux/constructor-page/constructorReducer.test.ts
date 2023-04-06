import lodash from 'lodash';
import { AddColumn, AddRow, ChangeCreatingQuestionType, ChangeTheme, CreateField, CreateQuestion, SetCurrentCell, SetNewFieldSize, ToggleCreatingQuestion, addColumn, addRow, changeCreatingQuestionType, changeTheme, constructorReducer, createField, createQuestion, setCurrentCell, setNewFieldSize, toggleCreatingQuestion } from "./constructorReducer";
import { type } from '@testing-library/user-event/dist/type';
import { ConstructorState } from '../../../types';

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
        const action: SetNewFieldSize = setNewFieldSize(4, 4);

        const result = constructorReducer(state, action);

        expect(result.fieldHeight).toBe(4);
    });

    it('field height should be 5', () => {
        const action: SetNewFieldSize = setNewFieldSize(4, 5);

        const result = constructorReducer(state, action);

        expect(result.fieldHeight).toBe(5);
    });
});

describe('field field must be created', () => {
    it('a 3 * 3 field should be created', () => {
        const action: CreateField = createField();

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
        const action: CreateField = createField();

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
    const actionCreateField: CreateField = createField();

    const action: AddRow = addRow();

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
    const actionCreateField: CreateField = createField();

    const action: AddColumn = addColumn();

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

});

describe('theme must change', () => {
    it('the first theme should be "Winx"', () => {
        const action: ChangeTheme = changeTheme(0, 'Winx');

        const result = constructorReducer(state, action);

        expect(result.themes[0]).toBe('Winx');
    });

    it('the third theme should be "Math"', () => {
        const action: ChangeTheme = changeTheme(2, 'Math');

        const result = constructorReducer(state, action);

        expect(result.themes[2]).toBe('Math');
    })
});

describe('creating question must change', () => {
    it('creating question should be true', () => {
        const action: ToggleCreatingQuestion = toggleCreatingQuestion(true);

        const result = constructorReducer(state, action);

        expect(result.creatingQuestion).toBe(true);
    });

    it('creating question should be false', () => {
        const action: ToggleCreatingQuestion = toggleCreatingQuestion(false);

        const result = constructorReducer(state, action);

        expect(result.creatingQuestion).toBe(false);
    });
});

describe('the question for the cell should change', () => {
    const actionCreateField: CreateField = createField();

    const newState = constructorReducer(state, actionCreateField);
    it('the question for the first cell should change', () => {
        const action: CreateQuestion = createQuestion('text', '01', 'Кто стал первым космонавтом?', ['Юрий Гагарин', 'Хазбик', 'Николас Кейдж'], 1);

        const result = constructorReducer(newState, action);

        expect(result.field[0][0]).toEqual({ key: '01', score: 200, question: 'Кто стал первым космонавтом?', answers: ['Юрий Гагарин', 'Хазбик', 'Николас Кейдж'], correct: 0, close: false });
    });
});

describe('current cell must change', () => {
    it('cell with key "02" should become current', () => {
        const action: SetCurrentCell = setCurrentCell("02");

        const result = constructorReducer(state, action);

        expect(result.currentCellKey).toBe("02");
    });
});

describe('creating question type must change', () => {
    it('creating question type should be "text"', () => {
        const action: ChangeCreatingQuestionType = changeCreatingQuestionType('text');

        const result = constructorReducer(state, action);

        expect(result.creatingQuestionType).toBe('text');
    });

    it('creating question type should be "audio"', () => {
        const action: ChangeCreatingQuestionType = changeCreatingQuestionType('audio');

        const result = constructorReducer(state, action);

        expect(result.creatingQuestionType).toBe('audio');
    });

    it('creating question type should be "video"', () => {
        const action: ChangeCreatingQuestionType = changeCreatingQuestionType('video');

        const result = constructorReducer(state, action);

        expect(result.creatingQuestionType).toBe('video');
    });
});
