import React from "react";
import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { useAppSelector } from "../../../hooks/useSelector";
import { setCurrentLevel } from "../../../redux/home-page/homeSlice";
import styles from "./styles.module.css";

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentLevel = useAppSelector(
    (state: RootState) => state.homePage.currentLevel
  );

  return (
    <div className={styles.theme}>
      <div className={styles.startingText}>
        Welcome to an exciting journey into the world of English! Our game is
        designed especially for elementary school children to make learning
        English fun and engaging. Here, you’ll find a variety of levels: from
        learning the alphabet and basic vocabulary to grammar and sentence
        building. You’ll meet fun characters like Grammar Dragon, Lexi the Fox,
        and Professor Wordy, who will help you complete the tasks. Are you ready
        to become a hero and conquer all the challenges? Then let’s go — new
        knowledge and adventures await you!
      </div>
      <div
        className={styles.start}
        onClick={() => dispatch(setCurrentLevel(currentLevel + 1))}
      >
        Start the game
      </div>
    </div>
  );
};

export default StartGame;
