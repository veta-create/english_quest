import { connect } from 'react-redux';
import Constructor from './index';

const mapStateToProps = (state) => {
    return {
        fieldHeight: state.constructorPage.fieldHeight,
        fieldWidth: state.constructorPage.fieldWidth
    };
};

const ConstructorContainer = connect(mapStateToProps, {})(Constructor);

export default ConstructorContainer;