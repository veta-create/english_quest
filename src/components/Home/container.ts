import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import Home from "./index";
import { getSettingsOpen } from "../../redux/settings-selectors";
import { changeSettingsOpen } from "../../redux/settingsReducer";

const mapStateToProps = (state: RootState) => {
    return {
        settingsOpen: getSettingsOpen(state)
    };
};

const HomeContainer = connect(mapStateToProps, {changeSettingsOpen})(Home);

export default HomeContainer;