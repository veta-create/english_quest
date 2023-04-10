import { connect } from "react-redux";
import { getFieldHeight, getFieldWidth, getPlayersCount } from "../../redux/settings-selectors";
import { addNewPlayer, changeFieldSize, changePlayersCount } from "../../redux/settingsReducer";
import Settings from "./index";
import { RootState } from "../../redux/store";

const mapStateToProps = (state: RootState) => {
    return {
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        playersCount: getPlayersCount(state)
    };
};

const SettingsContainer = connect(mapStateToProps, {
    changeFieldSize,
    changePlayersCount,
    addNewPlayer
})(Settings);

export default SettingsContainer;