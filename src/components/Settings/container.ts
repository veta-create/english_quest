import { connect } from "react-redux";
import { getFieldHeight, getFieldWidth } from "../../redux/settings-selectors";
import { changeFieldSize, changeSettingsOpen } from "../../redux/settingsReducer";
import Settings from "./index";
import { RootState } from "../../redux/store";

const mapStateToProps = (state: RootState) => {
    return {
        fieldWidth: getFieldWidth(state),
        fieldHeight: getFieldHeight(state),
    };
};

const SettingsContainer = connect(mapStateToProps, {
    changeFieldSize,
    changeSettingsOpen
})(Settings);

export default SettingsContainer;