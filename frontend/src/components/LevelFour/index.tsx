import React, { useState } from "react";
import useSound from "use-sound";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useSelector";
import { useAppDispatch } from "../../hooks/useDispatch";
import { setStarsCount } from "../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import Passed from "../common/passed/passed";
import speech from "../../sounds/giggleSpeech.mp3";
import speech2 from "../../sounds/giggleSpeech2.mp3";
import speech3 from "../../sounds/giggleSpeech3.mp3";

const LevelFour: React.FC = () => {
  const dispatch = useAppDispatch();
  const correctAnswers = useAppSelector(
    (state: RootState) => state.levelFourPage.correctAnswers
  );
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );
  const exersises = [
    ["bear", "hare", "bigger", "smaller"],
    ["train", "car", "longer", "shorter"],
    ["giraffe", "penguin", "taller", "shorter"],
  ];

  const [correctAnswer, setCorrectAnswer] = useState(correctAnswers[0]);
  const [start, setStart] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentExercise, setCurrentExercise] = useState(1);

  const [play, { stop }] = useSound(speech, { volume: 0.5 });
  const [speechTwo, { stop: stop2 }] = useSound(speech2, { volume: 0.5 });
  const [speechThree, { stop: stop3 }] = useSound(speech3, { volume: 0.5 });

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
                  className={styles.bigger}
                  src={require(`../../assets/${
                    exersises[currentExercise - 1][0]
                  }.png`)}
                />
                <img
                  className={styles.smaller}
                  src={require(`../../assets/${
                    exersises[currentExercise - 1][1]
                  }.png`)}
                />
              </div>
              <div className={styles.comprasions}>
                <div
                  onClick={() => {
                    setCurrentAnswer(exersises[currentExercise - 1][2]);
                  }}
                >
                  {exersises[currentExercise - 1][2]}
                </div>
                <div
                  onClick={() => {
                    setCurrentAnswer(exersises[currentExercise - 1][3]);
                  }}
                >
                  {exersises[currentExercise - 1][3]}
                </div>
              </div>
              <div className={styles.sentence}>
                the {exersises[currentExercise - 1][0]} is{" "}
                <div className={styles.skip}>{currentAnswer}</div> than the{" "}
                {exersises[currentExercise - 1][1]}
              </div>
              <div
                className={styles.checkAnswer}
                onClick={() => {
                  if (correctAnswer === currentAnswer) {
                    stop();
                    if (currentExercise === 1) {
                      speechTwo();
                    }
                    if (currentExercise === 2) {
                      speechThree();
                    }
                    if (currentExercise === correctAnswers.length) {
                      setLevelPassed(true);
                    } else {
                      setCurrentExercise(currentExercise + 1);
                      setCorrectAnswer(correctAnswers[currentExercise]);
                      setCurrentAnswer("");
                    }
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
              {attemptCounter > 0 && (
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
