import { connect } from 'react-redux';
import Game from './index';
import { changeCurrentQuestion, changeCurrentAnswer, submitAnswerButton, clickOnCell, timeIsOver } from '../../redux/game-page/gameReducer';
import { getCurrentPlayer, getCurrentQuestion, getField, getGameOver, getPlayers, getQuestionAnswered, getQuestionIsClosed, getThemes, getWinner } from '../../redux/game-page/game-selectors';

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        field: getField(state),
        players: getPlayers(state),
        currentPlayer: getCurrentPlayer(state),
        currentQuestion: getCurrentQuestion(state),
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