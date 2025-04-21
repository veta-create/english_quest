import React, { useState } from "react";
import useSound from "use-sound";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import { setStarsCount } from "../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import Passed from "../common/passed/passed";
import speech1 from "../../sounds/wordySpeech.mp3";
import speech2 from "../../sounds/wordySpeech_2.mp3";

const LevelOne: React.FC = () => {
  const dispatch = useAppDispatch();
  const lettersForTask = useAppSelector(
    (state: RootState) => state.levelOnePage.lettersForTask
  );
  const wordsForTask = useAppSelector(
    (state: RootState) => state.levelOnePage.wordsForTask
  );
  const correctAnswerLetters = useAppSelector(
    (state: RootState) => state.levelOnePage.correctAnswerLetters
  );
  const correctAnswerWords = useAppSelector(
    (state: RootState) => state.levelOnePage.correctAnswerWords
  );
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );

  const [start, setStart] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [clueOpened, setClueOpened] = useState(false);
  const [lettersForAnswer, setLettersForAnswer] = useState<string[]>([]);
  const [wordsForAnswer, setWordsForAnswer] = useState<string[]>([]);
  const [currentExercise, setCurrentExercise] = useState(1);

  const [play1, { stop: stop1 }] = useSound(speech1, { volume: 0.5 });
  const [play2, { stop: stop2 }] = useSound(speech2, { volume: 0.5 });

  const checkRightAnswer = () => {
    if (currentExercise === 1) {
      if (lettersForAnswer.toString() === correctAnswerLetters.toString()) {
        setCurrentExercise(2);
        play2();
        dispatch(setStarsCount(starsCount + (attemptCounter > 0 ? 1 : 2)));
      } else {
        setAttemptCounter(attemptCounter + 1);
        setLettersForAnswer([]);
      }
    }
    if (currentExercise === 2) {
      if (wordsForAnswer.toString() === correctAnswerWords.toString()) {
        stop2();
        setLevelPassed(true);
        dispatch(setStarsCount(starsCount + (attemptCounter > 0 ? 1 : 2)));
      } else {
        setAttemptCounter(attemptCounter + 1);
        setWordsForAnswer([]);
      }
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
                {currentExercise === 1 &&
                  lettersForTask.map((l: string) => (
                    <div
                      onClick={() => {
                        const currentAnswer = [...lettersForAnswer];

                        if (!currentAnswer.includes(l)) {
                          currentAnswer.push(l);
                          setLettersForAnswer(currentAnswer);
                        }
                      }}
                    >
                      {l}
                    </div>
                  ))}
                {currentExercise === 2 &&
                  wordsForTask.map((w: string) => (
                    <div
                      className={styles.word}
                      onClick={() => {
                        const currentAnswer = [...wordsForAnswer];

                        if (!currentAnswer.includes(w)) {
                          currentAnswer.push(w);
                          setWordsForAnswer(currentAnswer);
                        }
                      }}
                    >
                      {w}
                    </div>
                  ))}
              </div>
              <div className={styles.lettersForAnswer}>
                <div className={styles.letters}>
                  {currentExercise === 1 &&
                    lettersForAnswer.map((l) => (
                      <div className={styles.letter}>{l}</div>
                    ))}
                  {currentExercise === 2 &&
                    wordsForAnswer.map((w) => (
                      <div className={styles.word}>{w}</div>
                    ))}
                </div>
              </div>
              <div
                className={styles.checkAnswer}
                onClick={() => {
                  checkRightAnswer();
                  stop1();
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
                play1();
              }}
            >
              Hello!
            </div>
          )}
        </div>
        <div>
          <div className={styles.starsContainer}>
            <div
              className={styles.clue}
              onClick={() => {
                if (clueOpened) {
                  setClueOpened(false);
                } else {
                  setClueOpened(true);
                }
              }}
            >
              Clue
            </div>
            {clueOpened === true && (
              <p>Arrange the letters and words in alphabetical order!</p>
            )}
            <div className={styles.starsCount}>{starsCount}</div>
            <img
              className={styles.star}
              src={"/assets/star.png"}
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
