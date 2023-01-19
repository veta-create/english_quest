import { connect } from 'react-redux';
import { getField, getFieldHeight, getFieldWidth, getThemes } from '../../redux/constructor-selectors';
import { addColumn, addRow, createField, createFieldFromTemplate, setNewFieldSize } from '../../redux/constructorReducer';
import Constructor from './index';

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        field: getField(state)
    };
};

const ConstructorContainer = connect(mapStateToProps, { createFieldFromTemplate, addRow, addColumn })(Constructor);

export default ConstructorContainer;