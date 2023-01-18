import { connect } from 'react-redux';
import { getField, getFieldHeight, getFieldWidth, getThemes } from '../../redux/constructor-selectors';
import { createField } from '../../redux/constructorReducer';
import Constructor from './index';

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        field: getField(state)
    };
};

const ConstructorContainer = connect(mapStateToProps, {createField})(Constructor);

export default ConstructorContainer;