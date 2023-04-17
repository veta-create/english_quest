import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import Home from "./index";
import { getSettingsOpen } from "../../redux/settings-page/settings-selectors";
import { changeSettingsOpen } from "../../redux/settings-page/settingsReducer";

const mapStateToProps = (state: RootState) => {
    return {
        settingsOpen: getSettingsOpen(state)
    };
};

const HomeContainer = connect(mapStateToProps, {changeSettingsOpen})(Home);

export default HomeContainer;