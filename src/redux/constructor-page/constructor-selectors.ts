import { ConstructorState } from "../../../types";
import { RootState } from "../store";

export const getFieldWidth = (state: RootState) => {
    return state.constructorPage.fieldWidth;
};

export const getFieldHeight = (state: RootState) => {
    return state.constructorPage.fieldHeight;
};

export const getThemes = (state: RootState) => {
    return state.constructorPage.themes;
};

export const getField = (state: RootState) => {
    return state.constructorPage.field;
};

export const getCreatingQuestion = (state: RootState) => {
    return state.constructorPage.creatingQuestion;
};

export const getCreatingQuestionType = (state: RootState) => {
    return state.constructorPage.creatingQuestionType;
};

export const getCurrentCellKey = (state: RootState) => {
    return state.constructorPage.currentCellKey;
};