import React from "react";
import useSound from "use-sound";
import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { useAppSelector } from "../../../hooks/useSelector";
import { setCurrentLevel } from "../../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import victory from "../../../sounds/victorySound.mp3";

const Passed: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentLevel = useAppSelector(
    (state: RootState) => state.homePage.currentLevel
  );

  const [victorySound] = useSound(victory);
  victorySound();

  return (
    <div className={styles.theme}>
      <div className={styles.success}>
        You passed this level! Congratulations!
      </div>
      <div
        className={styles.next}
        onClick={() => dispatch(setCurrentLevel(currentLevel + 1))}
      >
        Next Level
      </div>
    </div>
  );
};

export default Passed;
