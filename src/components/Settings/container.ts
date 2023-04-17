import { connect } from "react-redux";
import { getFieldHeight, getFieldWidth, getTimer } from "../../redux/settings-page/settings-selectors";
import { changeFieldSize, changeSettingsOpen, setTimer } from "../../redux/settings-page/settingsReducer";
import Settings from "./index";
import { RootState } from "../../redux/store";

const mapStateToProps = (state: RootState) => {
    return {
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
        timer: getTimer(state)
    };
};

const SettingsContainer = connect(mapStateToProps, {
    changeFieldSize,
    changeSettingsOpen,
    setTimer
})(Settings);

export default SettingsContainer;