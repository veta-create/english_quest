import React, { useState } from "react";
import useSound from "use-sound";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import { setStarsCount } from "../../redux/home-page/homeSlice";
import styles from "./styles.module.css";
import Passed from "../common/passed/passed";
import lexiSpeechOne from "../../sounds/lexiSpeechOne.mp3";
import pig from "../../sounds/pig.mp3";
import goat from "../../sounds/goat.mp3";
import deer from "../../sounds/deer.mp3";
import ostrich from "../../sounds/ostrich.mp3";
import dog from "../../sounds/dog.mp3";
import cat from "../../sounds/cat.mp3";

const LevelTwo: React.FC = () => {
  const dispatch = useAppDispatch();
  const animalsForTask = useAppSelector(
    (state: RootState) => state.levelTwoPage.animalsForTask
  );
  const animalsForChoice = useAppSelector(
    (state: RootState) => state.levelTwoPage.animalsForChoice
  );
  const starsCount = useAppSelector(
    (state: RootState) => state.homePage.starsCount
  );

  const [start, setStart] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [clueOpened, setClueOpened] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(animalsForTask[0]);
  const [rightAnswers, setRightAnswers] = useState<string[]>([]);

  const [play, { stop }] = useSound(lexiSpeechOne, { volume: 0.5 });
  const [pigSpeech] = useSound(pig);
  const [goatSpeech] = useSound(goat);
  const [deerSpeech] = useSound(deer);
  const [ostrichSpeech] = useSound(ostrich);
  const [dogSpeech] = useSound(dog);
  const [catSpeech] = useSound(cat);

  const checkRightAmimal = (animal: string) => {
    stop();
    if (currentAnimal === animal) {
      const answer = [...rightAnswers];
      answer.push(animal);

      setRightAnswers(answer);

      const currentAnswer = animalsForChoice[answer.length];

      setCurrentAnimal(animalsForChoice[answer.length]);

      if (answer.length === animalsForTask.length) {
        setLevelPassed(true);
        dispatch(setStarsCount(starsCount + 1));
        return;
      }
      if (currentAnswer === "pig") {
        pigSpeech();
      }
      if (currentAnswer === "deer") {
        deerSpeech();
      }
      if (currentAnswer === "ostrich") {
        ostrichSpeech();
      }
      if (currentAnswer === "goat") {
        goatSpeech();
      }
      if (currentAnswer === "cat") {
        catSpeech();
      }
      if (currentAnswer === "dog") {
        dogSpeech();
      }
    } else {
      if (currentAnimal === "pig") {
        pigSpeech();
      }
      if (currentAnimal === "deer") {
        deerSpeech();
      }
      if (currentAnimal === "ostrich") {
        ostrichSpeech();
      }
      if (currentAnimal === "goat") {
        goatSpeech();
      }
      if (currentAnimal === "dog") {
        dogSpeech();
      }
      if (currentAnimal === "cat") {
        catSpeech();
      }
    }
  };

  if (!start) {
    play();
  }

  if (levelPassed) {
    return <Passed />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.task}>
          <div className={styles.level}>Level two: Vocabulary Kingdom</div>
          {start && (
            <div className={styles.things}>
              {animalsForTask.map((a: string) => (
                <img
                  onClick={() => checkRightAmimal(a)}
                  className={styles.animal}
                  key={a}
                  src={`/assets/${a}.png`}
                />
              ))}
            </div>
          )}
          {!start && (
            <div
              onClick={() => {
                stop();
                setStart(true);
                goatSpeech();
              }}
              className={styles.start}
            >
              start
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
            {clueOpened === true && <p>Click on the animal you heard!</p>}
            <div className={styles.starsCount}>{starsCount}</div>
            <img
              className={styles.star}
              src={"/assets/star.png"}
            />
          </div>
          <div className={styles.lexi}></div>
        </div>
      </div>
    );
  }
};

export default LevelTwo;
