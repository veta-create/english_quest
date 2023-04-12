import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import {
    cellClosure,
    changeCurrentAnswer,
    determineWinner,
    playerChange,
    scoreCounter,
    setGameOver,
    setQuestionIsClosed
} from "../../../redux/game-page/gameReducer";
import RadioForm from ".";
import {
    getCurrentQuestion,
    getFieldHeight,
    getFieldWidth,
    getPlayers,
    getQuestionAnswered
} from "../../../redux/game-page/game-selectors";

const mapStateToProps = (state: RootState) => {
    return {
        currentQuestion: getCurrentQuestion(state),
        questionAnswered: getQuestionAnswered(state),
        players: getPlayers(state),
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state)
    };
};

const RadioFormContainer = connect(mapStateToProps, {
    changeCurrentAnswer,
    scoreCounter,
    cellClosure,
    playerChange,
    setQuestionIsClosed,
    determineWinner,
    setGameOver
})(RadioForm);

export default RadioFormContainer;