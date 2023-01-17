import { connect } from 'react-redux';
import Game from './index';
import { changeCurrentQuestion, changeCurrentAnswer } from '../../redux/gameReducer';

const mapStateToProps = (state) => {
    return {
        field: state.gamePage.field,
        players: state.gamePage.players,
        currentQuestion: state.gamePage.currentQuestion,
        currentAnswer: state.gamePage.currentQuestion.currentAnswer
    };
};

const GameContainer = connect(mapStateToProps, {changeCurrentQuestion, changeCurrentAnswer})(Game);

export default GameContainer;