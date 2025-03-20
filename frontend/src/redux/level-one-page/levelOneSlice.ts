import { createSlice } from "@reduxjs/toolkit";
import { LevelOneState } from "../../../types";

const initialState: LevelOneState = {
  lettersForTask: ["B", "A", "C", "E", "D"],
  lettersForAnswer: [],
  correctAnswer: ["A", "B", "C", "D", "E"],
  levelPassed: [0, false],
  wordySpeech: []
};

const levelOneSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setLettersForTask(state, action) {},
    setLettersForAnswer(state, action) {
      if (!state.lettersForAnswer.includes(action.payload)) {
        state.lettersForAnswer.push(action.payload);
      }
      //   state.currentQuestion.currentAnswer = action.payload;
    },
    voiceOverLetter(state, action) {},
    checkRightAnswer: (state, action) => {
      if (action.payload.toString() === state.correctAnswer.toString()) {
        state.levelPassed[1] = true;
      } else {
        state.levelPassed[0] = 1;
        state.levelPassed[1] = false;
        state.lettersForAnswer = [];
      }
    },
  },
});

export default levelOneSlice.reducer;
export const {
  setLettersForTask,
  setLettersForAnswer,
  voiceOverLetter,
  checkRightAnswer,
} = levelOneSlice.actions;
