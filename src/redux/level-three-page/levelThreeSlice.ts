import { createSlice } from "@reduxjs/toolkit";
import { LevelThreeState } from "../../types";

const initialState: LevelThreeState = {
  lettersForTask: [
    ["C", "O", "E", "N", "A"],
    ["U", "M", "I", "N", "S", "T", "O", "A", "N"],
    ["F", "R", "T", "O", "S", "E"],
  ],
  correctAnswer: [
    ["O", "C", "E", "A", "N"],
    ["M", "O", "U", "N", "T", "A", "I", "N", "S"],
    ["F", "O", "R", "E", "S", "T"],
  ],
};

const levelThreeSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

export default levelThreeSlice.reducer;
export const {} = levelThreeSlice.actions;
