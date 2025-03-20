import { createSlice } from "@reduxjs/toolkit";
import { LevelFourState } from "../../../types";

const initialState: LevelFourState = {
  correctAnswer: "bigger",
};

const levelFourSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

export default levelFourSlice.reducer;
export const {} = levelFourSlice.actions;
