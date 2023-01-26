import { connect } from 'react-redux';
import Game from './index';
import { changeCurrentQuestion, changeCurrentAnswer, submitAnswerButton, clickOnCell, timeIsOver } from '../../redux/gameReducer';
import { getCurrentAnswer, getCurrentPlayer, getCurrentQuestion, getField, getGameOver, getPlayers, getQuestionAnswered, getQuestionIsClosed, getThemes, getWinner } from '../../redux/game-selectors';

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        field: getField(state),
        players: getPlayers(state),
        currentPlayer: getCurrentPlayer(state),
        currentQuestion: getCurrentQuestion(state),
        currentAnswer: getCurrentAnswer(state),
        questionAnswered: getQuestionAnswered(state),
        gameOver: getGameOver(state),
        winner: getWinner(state),
        questionIsClosed: getQuestionIsClosed(state)
    };
};

const GameContainer = connect(mapStateToProps, 
    {changeCurrentQuestion, changeCurrentAnswer, submitAnswerButton, clickOnCell, timeIsOver})
    (Game);

export default GameContainer;