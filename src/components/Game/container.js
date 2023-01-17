import { connect } from 'react-redux';
import Game from './index';
import { changeCurrentQuestion, changeCurrentAnswer, submitAnswerButton } from '../../redux/gameReducer';

const mapStateToProps = (state) => {
    return {
        field: state.gamePage.field,
        players: state.gamePage.players,
        currentQuestion: state.gamePage.currentQuestion,
        currentAnswer: state.gamePage.currentQuestion.currentAnswer,
        currentPlayer: state.gamePage.currentPlayer
    };
};

const GameContainer = connect(mapStateToProps, 
    {changeCurrentQuestion, changeCurrentAnswer, submitAnswerButton})
    (Game);

export default GameContainer;