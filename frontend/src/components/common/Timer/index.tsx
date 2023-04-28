import React, { Dispatch, SetStateAction } from "react";
import cn from "classnames";
import { useAppSelector } from "../../../hooks/useSelector";
import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { cellClosure, changeQuestionAnswered, determineWinner, playerChange, scoreCounter, setGameOver, setQuestionIsClosed } from "../../../redux/game-page/gameSlice";

interface TimerPropsTypes {
  timer: number,
  setSelectDisabled: Dispatch<SetStateAction<boolean>>
};

const Timer: React.FC<TimerPropsTypes> = (props) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state: RootState) => state.gamePage.players);
  const [over, setOver] = React.useState(false);
  const [[m, s], setTime] = React.useState([0, props.timer]);
  const currentPlayer = useAppSelector((state: RootState) => state.gamePage.currentPlayer);
  const currentQuestion = useAppSelector((state: RootState) => state.gamePage.currentQuestion);
  const questionAnswered = useAppSelector((state: RootState) => state.gamePage.questionAnswered);
  const fieldWidth = useAppSelector((state: RootState) => state.gamePage.fieldWidth);
  const fieldHeight = useAppSelector((state: RootState) => state.gamePage.fieldHeight);

  const tick = () => {
    if (m === 0 && s === 0) {
      setOver(true);
    } else if (m === 0 && s === 0) {
      setTime([59, 59]);
    } else if (s === 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }

    if (over) {
      props.setSelectDisabled(false);
      if (players.length <= 2) {
        dispatch(scoreCounter({ playerKey: currentPlayer, answerId: currentQuestion.currentAnswer }));
        dispatch(cellClosure(currentQuestion.key));
        dispatch(setQuestionIsClosed(true));
        dispatch(changeQuestionAnswered());
        if (questionAnswered === fieldWidth * fieldHeight - 1) {
          dispatch(determineWinner());
          dispatch(setGameOver());
        };
      }
    };
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div>
      <p className={cn("flex", "justify-end", "content-end")}>{`${m
        .toString()
        .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
      {players.length > 1 && <div>{over ? "Время закончилось, можете выбрать другого игрока для ответа" : ''}</div>}
    </div>
  );
};

export default Timer;