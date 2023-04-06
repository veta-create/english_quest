import React from "react";
import cn from "classnames";

interface TimerPropsTypes {
  minutes: number,
  seconds: number, 
  currentQuestion: { answers: [string, string, string], correct: number, currentAnswer: number, key: string, score: number, question: string },
  scoreCounter: (answerId: number) => ({ type: string, answerId: number }),
  setQuestionIsClosed: (questionIsClosed: boolean) => ({ type: string, questionIsClosed: boolean }),
  playerChange: () => ({ type: string })
}

const Timer: React.FC<TimerPropsTypes> = (props) => {
    const [over, setOver] = React.useState(false);
    const [[m, s], setTime] = React.useState([props.minutes, props.seconds]);
  
    const tick = () => {
      if (over) {
        props.scoreCounter(props.currentQuestion.currentAnswer);
        props.setQuestionIsClosed(true);
        props.playerChange();
      };
  
      if (m === 0 && s === 0) {
        setOver(true);
      } else if (m === 0 && s === 0) {
        setTime([59, 59]);
      } else if (s === 0) {
        setTime([m - 1, 59]);
      } else {
        setTime([m, s - 1]);
      }
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
        <div>{over ? "Время закончилось" : ''}</div>
      </div>
    );
  };

export default Timer;