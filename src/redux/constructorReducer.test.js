import { constructorReducer, setNewFieldSize } from "./constructorReducer";

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