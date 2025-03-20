import { createSlice } from "@reduxjs/toolkit";
import { LevelThreeState } from "../../../types";

const initialState: LevelThreeState = {
  lettersForTask: ["C", "O", "E", "N", "A"],
  correctAnswer: ["O", "C", "E", "A", "N"],
};

const levelThreeSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

export default levelThreeSlice.reducer;
export const {} = levelThreeSlice.actions;
