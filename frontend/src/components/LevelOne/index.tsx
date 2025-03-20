import React, { useState } from "react";
import useSound from "use-sound";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import { setStarsCount } from "../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import Passed from "../common/passed/passed";
import speech from "../../sounds/wordySpeech.mp3";

const LevelOne: React.FC = () => {
  const dispatch = useAppDispatch();
  const lettersForTask = useAppSelector(
    (state: RootState) => state.levelOnePage.lettersForTask
  );
  const correctAnswer = useAppSelector(
    (state: RootState) => state.levelOnePage.correctAnswer
  );
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );

  const [start, setStart] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [lettersForAnswer, setLettersForAnswer] = useState<String[]>([]);

  const [play, { stop }] = useSound(speech, { volume: 0.5 });

  const checkRightAnswer = () => {
    if (lettersForAnswer.toString() === correctAnswer.toString()) {
      setLevelPassed(true);
      dispatch(setStarsCount(starsCount + (attemptCounter > 0 ? 1 : 2)));
    } else {
      setAttemptCounter(attemptCounter + 1);
      setLettersForAnswer([]);
    }
  };

  if (!levelPassed) {
    return (
      <div className={styles.container}>
        <div className={styles.task}>
          <div className={styles.level}>Level one: Alphabet</div>
          {start && (
            <div className={styles.lettersContainer}>
              <div className={styles.lettersForTask}>
                {lettersForTask.map((l: string) => (
                  <div
                    onClick={() => {
                      const currentAnswer = [...lettersForAnswer];

                      currentAnswer.push(l);

                      setLettersForAnswer(currentAnswer);
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className={styles.lettersForAnswer}>
                <div className={styles.letters}>
                  {lettersForAnswer.map((l) => (
                    <div className={styles.letter}>{l}</div>
                  ))}
                </div>
                {lettersForAnswer.length === 5 && (
                  <div>Did you use all the letters</div>
                )}
              </div>
              <div
                className={styles.checkAnswer}
                onClick={() => {
                  checkRightAnswer();
                  stop();
                }}
              >
                Check the answer
              </div>
              {attemptCounter > 0 && (
                <div className={styles.tryAgain}>Try again!</div>
              )}
            </div>
          )}
          {!start && (
            <div
              className={styles.greeting}
              onClick={() => {
                setStart(true);
                play();
              }}
            >
              Hello!
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
          <div className={styles.wordy}></div>
        </div>
      </div>
    );
  } else {
    return <Passed />;
  }
};

export default LevelOne;
