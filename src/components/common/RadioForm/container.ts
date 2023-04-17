import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import {
    cellClosure,
    changeCurrentAnswer,
    changeQuestionAnswered,
    determineWinner,
    playerChange,
    scoreCounter,
    setCurrentPlayer,
    setGameOver,
    setQuestionIsClosed
} from "../../../redux/game-page/gameReducer";
import RadioForm from ".";
import {
    getCurrentPlayer,
    getCurrentQuestion,
    getFieldHeight,
    getFieldWidth,
    getPlayers,
    getQuestionAnswered
} from "../../../redux/game-page/game-selectors";
import { getCurrentCellKey } from "../../../redux/constructor-page/constructor-selectors";

const mapStateToProps = (state: RootState) => {
    return {
        currentQuestion: getCurrentQuestion(state),
        questionAnswered: getQuestionAnswered(state),
        players: getPlayers(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        currentPlayer: getCurrentPlayer(state)
    };
};

const RadioFormContainer = connect(mapStateToProps, {
    changeCurrentAnswer,
    scoreCounter,
    cellClosure,
    playerChange,
    setQuestionIsClosed,
    determineWinner,
    setGameOver,
    setCurrentPlayer,
    changeQuestionAnswered
})(RadioForm);

export default RadioFormContainer;