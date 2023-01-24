import { connect } from "react-redux";
import { getFieldHeight, getFieldWidth, getPlayersCount } from "../../redux/settings-selectors";
import { changeFieldSize, changePlayersCount } from "../../redux/settingsReducer";
import Settings from "./index";

const mapStateToProps = (state) => {
    return {
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        playersCount: getPlayersCount(state)
    };
};

const SettingsContainer = connect(mapStateToProps, {changeFieldSize, changePlayersCount})(Settings);

export default SettingsContainer;