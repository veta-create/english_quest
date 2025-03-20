import React from "react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useSelector";
import StartGame from "../common/startGame/startGame";
import LevelOne from "../LevelOne";
import LevelTwo from "../LevelTwo";
import LevelThree from "../LevelThree";
import LevelFour from "../LevelFour";
import LevelFive from "../LevelFive";
import EndGame from "../common/endGame/endGame";

const Home: React.FC = () => {
  const currentLevel = useAppSelector(
    (state: RootState) => state.homePage.currentLevel
  );
  return (
    <div>
      <div>
        {currentLevel === 100 && <EndGame />}
        {!currentLevel && <StartGame />}
        {currentLevel === 1 && <LevelOne />}
        {currentLevel === 2 && <LevelTwo />}
        {currentLevel === 3 && <LevelThree />}
        {currentLevel === 4 && <LevelFour />}
        {currentLevel === 5 && <LevelFive />}
      </div>
    </div>
  );
};

export default Home;
