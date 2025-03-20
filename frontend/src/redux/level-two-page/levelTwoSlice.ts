import { createSlice } from "@reduxjs/toolkit";
import { LevelTwoState } from "../../../types";

const initialState: LevelTwoState = {
  fruitsForTask: ["peach", "pear", "strawberry"],
  animalsForTask: ["goat", "deer", "ostrich", "pig", "cat", "dog"],
  animalsForChoice: ["goat", "ostrich", "cat", "pig", "deer", "dog"],
  levelPassed: [0, false],
};

const levelTwoSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setLettersForTask(state, action) {},
    setLettersForAnswer(state, action) {
      //   state.currentQuestion.currentAnswer = action.payload;
    },
    voiceOverLetter(state, action) {},
    checkRightAnswer: (state, action) => {},
  },
});

export default levelTwoSlice.reducer;
export const {} = levelTwoSlice.actions;
