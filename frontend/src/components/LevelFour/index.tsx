import React, { useState } from "react";
import useSound from "use-sound";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useSelector";
import { useAppDispatch } from "../../hooks/useDispatch";
import { setStarsCount } from "../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import Passed from "../common/passed/passed";
import speech from "../../sounds/giggleSpeech.mp3";

const LevelFour: React.FC = () => {
  const dispatch = useAppDispatch();
  const correctAnswer = useAppSelector(
    (state: RootState) => state.levelFourPage.correctAnswer
  );
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );

  const [start, setStart] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [play, { stop }] = useSound(speech, { volume: 0.5 });

  if (levelPassed) {
    return <Passed />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.task}>
          <div className={styles.level}>Level four: Comparison Carnival</div>
          {!start && (
            <div
              className={styles.start}
              onClick={() => {
                play();
                setStart(true);
              }}
            >
              Hello!
            </div>
          )}
          {start && (
            <div className={styles.main}>
              <div className={styles.things}>
                <img
                  className={styles.bear}
                  src={require("../../assets/bear.png")}
                />
                <img
                  className={styles.bunny}
                  src={require("../../assets/bunny.png")}
                />
              </div>
              <div className={styles.comprasions}>
                <div
                  onClick={() => {
                    setCurrentAnswer("smaller");
                  }}
                >
                  smaller
                </div>
                <div
                  onClick={() => {
                    setCurrentAnswer("bigger");
                  }}
                >
                  bigger
                </div>
              </div>
              <div className={styles.sentence}>
                the bear is <div className={styles.skip}>{currentAnswer}</div>{" "}
                than the hare
              </div>
              <div
                className={styles.checkAnswer}
                onClick={() => {
                  if (correctAnswer === currentAnswer) {
                    stop();
                    setLevelPassed(true);
                    dispatch(
                      setStarsCount(starsCount + (attemptCounter > 0 ? 1 : 2))
                    );
                  } else {
                    setAttemptCounter(attemptCounter + 1);
                    setCurrentAnswer("");
                  }
                }}
              >
                Check the answer
              </div>
              {attemptCounter && (
                <div className={styles.tryAgain}>Try again!</div>
              )}
            </div>
          )}
        </div>
        <div>
          <div className={styles.starsContainer}>
            <div className={styles.starsCount}>{starsCount}</div>
            <img
              className={styles.star}
              src={require(`../../assets/star.png`)}
            />
          </div>
          <div className={styles.giggle}></div>
        </div>
      </div>
    );
  }
};

export default LevelFour;
