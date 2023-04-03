import { connect } from 'react-redux';
import { getCreatingQuestion, getCreatingQuestionType, getCurrentCell, getField, getFieldHeight, getFieldWidth, getThemes } from '../../redux/constructor-page/constructor-selectors';
import { addColumn, addNewQuestion, addRow, changeCreatingQuestionType, changeTheme, clickOnCell, createFieldFromTemplate, setCurrentCell } from '../../redux/constructor-page/constructorReducer';
import Constructor from './index';

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        field: getField(state), 
        creatingQuestion: getCreatingQuestion(state),
        currentCell: getCurrentCell(state),
        creatingQuestionType: getCreatingQuestionType(state)
    };
};

const ConstructorContainer = connect(mapStateToProps,
     { createFieldFromTemplate,
        addRow,
        addColumn,
        clickOnCell,
        addNewQuestion,
        setCurrentCell,
        changeTheme,
        changeCreatingQuestionType
     })
     (Constructor);

export default ConstructorContainer;