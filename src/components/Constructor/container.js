import { connect } from 'react-redux';
import { getCreatingQuestion, getCurrentCell, getField, getFieldHeight, getFieldWidth, getThemes } from '../../redux/constructor-selectors';
import { addColumn, addNewQuestion, addRow, clickOnCell, createFieldFromTemplate, setCurrentCell } from '../../redux/constructorReducer';
import Constructor from './index';

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        field: getField(state), 
        creatingQuestion: getCreatingQuestion(state),
        currentCell: getCurrentCell(state)
    };
};

const ConstructorContainer = connect(mapStateToProps,
     { createFieldFromTemplate,
        addRow,
        addColumn,
        clickOnCell,
        addNewQuestion,
        setCurrentCell
     })
     (Constructor);

export default ConstructorContainer;