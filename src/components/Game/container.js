import { connect } from 'react-redux';
import Game from './index';
import { changeCurrentQuestion, changeCurrentAnswer, submitAnswerButton } from '../../redux/gameReducer';
import { getCurrentAnswer, getCurrentPlayer, getCurrentQuestion, getField, getPlayers, getThemes } from '../../redux/game-selectors';

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        field: getField(state),
        players: getPlayers(state),
        currentPlayer: getCurrentPlayer(state),
        currentQuestion: getCurrentQuestion(state),
        currentAnswer: getCurrentAnswer(state)
    };
};

const GameContainer = connect(mapStateToProps, 
    {changeCurrentQuestion, changeCurrentAnswer, submitAnswerButton})
    (Game);

export default GameContainer;