import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { getCreatingQuestionType, getCurrentCellKey } from "../../../redux/constructor-page/constructor-selectors";
import { changeCreatingQuestionType, createQuestion, toggleCreatingQuestion } from "../../../redux/constructor-page/constructorReducer";
import CreateForm from ".";

const mapStateToProps = (state: RootState) => {
    return {
        currentCellKey: getCurrentCellKey(state),
        creatingQuestionType: getCreatingQuestionType(state)
    };
};

const CreateFormContainer = connect(mapStateToProps, {
    createQuestion,
    toggleCreatingQuestion,
    changeCreatingQuestionType
})(CreateForm);

export default CreateFormContainer;