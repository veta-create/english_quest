import { connect } from 'react-redux';
import Game from './index';

const mapStateToProps = (state) => {
    return {
        fieldHeight: state.constructorPage.fieldHeight,
        fieldWidth: state.constructorPage.fieldWidth
    };
};

const GameContainer = connect(mapStateToProps, {changeCurrentQuestion, changeCurrentAnswer})(Game);

export default GameContainer;