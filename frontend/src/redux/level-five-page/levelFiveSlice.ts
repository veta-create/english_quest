import { createSlice } from "@reduxjs/toolkit";
import { LevelFiveState } from "../../../types";

const initialState: LevelFiveState = {
  correctAnswers: ["is", "am"],
};

const levelFiveSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

export default levelFiveSlice.reducer;
export const {} = levelFiveSlice.actions;
