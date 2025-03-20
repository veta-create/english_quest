import { combineReducers, configureStore } from "@reduxjs/toolkit";
import levelOneSlice from "./level-one-page/levelOneSlice";
import levelTwoSlice from "./level-two-page/levelTwoSlice";
import levelThreeSlice from "./level-three-page/levelThreeSlice";
import levelFourSlice from "./level-four-page/levelFourSlice";
import levelFiveSlice from "./level-five-page/levelFiveSlice";
import homeSlice from "./home-page/homeSlice";

const reducers = combineReducers({
  homePage: homeSlice,
  levelOnePage: levelOneSlice,
  levelTwoPage: levelTwoSlice,
  levelThreePage: levelThreeSlice,
  levelFourPage: levelFourSlice,
  levelFivePage: levelFiveSlice,
});

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
