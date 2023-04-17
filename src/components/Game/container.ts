import { connect } from 'react-redux';
import Game from './index';
import {
    changeCurrentQuestion,
    changeCurrentAnswer,
    setQuestionIsClosed,
    setGameOver,
} from '../../redux/game-page/gameReducer';
import {
    getCurrentPlayer,
    getField,
    getFieldHeight,
    getFieldWidth,
    getGameOver,
    getPlayers,
    getQuestionAnswered,
    getQuestionIsClosed,
    getThemes,
    getWinner
} from '../../redux/game-page/game-selectors';
import { RootState } from '../../redux/store';

const mapStateToProps = (state: RootState) => {
    return {
        themes: getThemes(state),
        field: getField(state),
        players: getPlayers(state),
        currentPlayer: getCurrentPlayer(state),
        questionAnswered: getQuestionAnswered(state),
        gameOver: getGameOver(state),
        winner: getWinner(state),
        questionIsClosed: getQuestionIsClosed(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state)
    };
};

const GameContainer = connect(mapStateToProps,
    {
        changeCurrentQuestion,
        changeCurrentAnswer,
        setQuestionIsClosed,
        setGameOver,
    })
    (Game);

export default GameContainer;