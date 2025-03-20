import React, { useState } from "react";
import useSound from "use-sound";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useSelector";
import { useAppDispatch } from "../../hooks/useDispatch";
import { setStarsCount } from "../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import Passed from "../common/passed/passed";
import speech from "../../sounds/grammarDragonSpeech.mp3";

const LevelFive: React.FC = () => {
  const dispatch = useAppDispatch();
  const correctAnswers = useAppSelector(
    (state: RootState) => state.levelFivePage.correctAnswers
  );
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );

  const [start, setStart] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [firstCurrentAnswer, setFirstCurrentAnswer] = useState("");
  const [secondCurrentAnswer, setSecondCurrentAnswer] = useState("");

  const [play, { stop }] = useSound(speech, { volume: 0.5 });

  const checkRightAnswer = () => {
    if (
      firstCurrentAnswer === correctAnswers[0] &&
      secondCurrentAnswer === correctAnswers[1]
    ) {
      stop();
      setLevelPassed(true);
      dispatch(setStarsCount(starsCount + (tryAgain ? 1 : 2)));
    } else {
      setTryAgain(true);
      setFirstCurrentAnswer("");
      setSecondCurrentAnswer("");
    }
  };

  if (levelPassed) {
    return <Passed />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.task}>
          <div className={styles.level}>Level five: Grammar Castle</div>
          {start && (
            <div>
              <div className={styles.main}>
                <div className={styles.card}>
                  <img src={require("../../assets/teacher.png")} />
                  <div className={styles.sentence}>
                    She{" "}
                    {firstCurrentAnswer ? (
                      firstCurrentAnswer
                    ) : (
                      <div className={styles.skip}></div>
                    )}{" "}
                    a teacher.
                  </div>
                  <div className={styles.options}>
                    <p onClick={() => setFirstCurrentAnswer("am")}>am</p>
                    <p onClick={() => setFirstCurrentAnswer("is")}>is</p>
                    <p onClick={() => setFirstCurrentAnswer("are")}>are</p>
                  </div>
                </div>
                <div className={styles.card}>
                  <img src={require("../../assets/happy.png")} />
                  <div className={styles.sentence}>
                    I{" "}
                    {secondCurrentAnswer ? (
                      secondCurrentAnswer
                    ) : (
                      <div className={styles.skip}></div>
                    )}{" "}
                    happy
                  </div>
                  <div className={styles.options}>
                    <p onClick={() => setSecondCurrentAnswer("am")}>am</p>
                    <p onClick={() => setSecondCurrentAnswer("is")}>is</p>
                    <p onClick={() => setSecondCurrentAnswer("are")}>are</p>
                  </div>
                </div>
              </div>
              <div
                className={styles.checkAnswer}
                onClick={() => checkRightAnswer()}
              >
                Check answer
              </div>
            </div>
          )}
          {!start && (
            <div
              className={styles.start}
              onClick={() => {
                play();
                setStart(true);
              }}
            >
              start
            </div>
          )}
          {tryAgain && <div className={styles.tryAgain}>Try again!</div>}
        </div>
        <div>
          <div className={styles.starsContainer}>
            <div className={styles.starsCount}>{starsCount}</div>
            <img
              className={styles.star}
              src={require(`../../assets/star.png`)}
            />
          </div>
          <div className={styles.dragon}></div>
        </div>
      </div>
    );
  }
};

export default LevelFive;
