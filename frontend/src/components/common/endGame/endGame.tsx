import React from "react";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../hooks/useSelector";
import styles from "./styles.module.css";

const EndGame: React.FC = () => {
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );
  return (
    <div className={styles.theme}>
      <div className={styles.endingText}>
        You did it! All the challenges are behind you, and now you’re ready for
        new heights. The English language opens up a world of opportunities for
        you. Onward to new knowledge!
        {starsCount === 9 ? (
          <p>
            You have collected the maximum amount {starsCount}{" "}
            <img
              className={styles.star}
              src={require(`../../../assets/star.png`)}
            />
          </p>
        ) : (
          <p>
            And collected {starsCount}
            <img
              className={styles.star}
              src={require(`../../../assets/star.png`)}
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default EndGame;
