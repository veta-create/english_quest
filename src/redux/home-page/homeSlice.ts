import { createSlice } from "@reduxjs/toolkit";
import { HomeState } from "../../types";

const initialState: HomeState = {
  currentLevel: 0,
  levelNames: [
    "Alphabet",
    "Vocabulary Kingdom",
    "Word Builder Workshop",
    "Comparison Carnival",
    "Grammar Castle",
  ],
  starsCount: 0,
};

const homeSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrentLevel(state, action) {
      console.log(state.currentLevel, state.levelNames.length);
      if (state.currentLevel === state.levelNames.length) {
        state.currentLevel = 100;
      } else {
        state.currentLevel = action.payload;
      }
    },
    setStarsCount(state, action) {
      state.starsCount = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const { setCurrentLevel, setStarsCount } = homeSlice.actions;
