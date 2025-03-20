import React, { useState } from "react";
import useSound from "use-sound";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import { setStarsCount } from "../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import Passed from "../common/passed/passed";
import letterFixSpeech from "../../sounds/letterfix.mp3";

const LevelThree: React.FC = () => {
  const dispatch = useAppDispatch();
  const lettersForTask = useAppSelector(
    (state: RootState) => state.levelThreePage.lettersForTask
  );
  const correctAnswer = useAppSelector(
    (state: RootState) => state.levelThreePage.correctAnswer
  );
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );

  const [start, setStart] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [task, setTask] = useState(lettersForTask);
  const [currentAnswer, setCurrentAnswer] = useState(["", "", "", "", ""]);
  const [counter, setCounter] = useState(0);
  const [tryAgain, setTryAgain] = useState(false);
  const [play, { stop }] = useSound(letterFixSpeech, { volume: 0.5 });

  const checkRightAnswer = (letter: string) => {
    const currentLetters = [...currentAnswer];
    currentLetters[counter] = letter;

    setCounter(counter + 1);
    setCurrentAnswer(currentLetters);

    const currentTask = [...task].join().replace(letter, "");

    setTask(currentTask.split(","));

    if (currentLetters.toString() === correctAnswer.toString()) {
      stop();
      setLevelPassed(true);
      dispatch(setStarsCount(starsCount + (tryAgain ? 1 : 2)));
    }

    if (currentLetters.join("").length === correctAnswer.length) {
      setCurrentAnswer(["", "", "", "", ""]);
      setCounter(0);
      setTryAgain(true);
      setTask(lettersForTask);
    }
  };

  if (levelPassed) {
    return <Passed />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.task}>
          <div className={styles.level}>Level three: Word Builder Workshop</div>
          {start && (
            <div className={styles.main}>
              <img src={require("../../assets/ocean.png")} />
              <div className={styles.lettersForTask}>
                {task.map((l) => (
                  <div
                    onClick={() => {
                      checkRightAnswer(l);
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className={styles.word}>
                {currentAnswer.map((l) => (
                  <div className={styles.letter}>{l}</div>
                ))}
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
          <div className={styles.letterfix}></div>
        </div>
      </div>
    );
  }
};

export default LevelThree;
