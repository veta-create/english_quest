import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { getPlayersCount } from "../../../redux/game-page/game-selectors";
import { addNewPlayers } from "../../../redux/game-page/gameReducer";
import { AddPlayersForm } from ".";

const mapStateToProps = (state: RootState) => {
    return {
        playersCount: getPlayersCount(state),
    };
};

const AddPlayersFormContainer = connect(mapStateToProps, {
    addNewPlayers
})(AddPlayersForm);

export default AddPlayersFormContainer;