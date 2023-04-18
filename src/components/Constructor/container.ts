import { connect } from 'react-redux';
import {
    getCreatingQuestion, getField,
    getFieldHeight,
    getFieldWidth,
    getThemes
} from '../../redux/constructor-page/constructor-selectors';
import {
    addColumn,
    addRow,
    changeCreatingQuestionType,
    changeTheme,
    createField,
    createQuestion,
    setCurrentCell,
    setNewFieldSize,
    toggleCreatingQuestion
} from '../../redux/constructor-page/constructorReducer';
import Constructor from './index';
import { RootState } from '../../redux/store';

const mapStateToProps = (state: RootState) => {
    return {
        themes: getThemes(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        field: getField(state),
        creatingQuestion: getCreatingQuestion(state),
    };
};

const ConstructorContainer = connect(mapStateToProps,
    {
        setNewFieldSize,
        createField,
        addRow,
        addColumn,
        createQuestion,
        toggleCreatingQuestion,
        setCurrentCell,
        changeTheme,
        changeCreatingQuestionType
    })
    (Constructor);

export default ConstructorContainer;